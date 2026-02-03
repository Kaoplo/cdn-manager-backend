import { redis } from "../config/redis";
import { db } from "../db";
import { videos } from "../db/schema/videos";
import { encodeToHLS } from "../utils/ffmpeg";
import {eq} from "drizzle-orm"
import path from "path";

async function workerLoop() {
  console.log("🟢 Encoder worker started, waiting for jobs...");

  while (true) {
    try {
      // BRPOP blocks until a job exists
      const jobRaw = await redis.brpop("video_jobs", 0);
      if (!jobRaw) {
        return
      }
      const job = JSON.parse(jobRaw[1]);

      console.log(`➡️  Starting encoding job for video ${job.videoId}`);

      // Update status to 'encoding'
      await db.update(videos)
        .set({ status: "encoding" })
        .where(eq(videos.id, job.videoId));

      // Encode to HLS
      const outputPath = path.join(job.outputPath, "hls");
      await encodeToHLS(job.inputPath, job.outputPath);

      // Mark as ready
      await db.update(videos)
        .set({ status: "ready", output_path: outputPath })
        .where(eq(videos.id, job.videoId));

      console.log(`✅ Encoding completed for video ${job.videoId}`);
    } catch (err) {
      console.error("❌ Error in encoder worker:", err);
      // Optionally mark video as failed
    }
  }
}

workerLoop();
