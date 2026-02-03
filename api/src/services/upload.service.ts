import { redis } from "../config/redis";
import { videoRepo } from "../repo/video.repo";
import { env } from "../config/env";
import fs from "fs";
import path from "path";

export const uploadService = {
    async handleUpload(file: File) {
        const uploadsDir = path.join(env.STORAGE_PATH, "uploads");
        if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, {recursive: true});

        const filePath = path.join(uploadsDir, file.name);
        const arrayBuffer = await file.arrayBuffer();
        fs.writeFileSync(filePath, Buffer.from(arrayBuffer));

            const video = await videoRepo.create({
                original_filename: file.name,
                status: "uploaded",
                output_path: undefined,
            });

        if (!video) {
            return null
        }

        await redis.lpush("video_jobs", JSON.stringify({
            type: "encode",
            videoId: video.id,
            inputPath: filePath,
            outputPath: path.join(env.STORAGE_PATH, "encoded", String(video.id)),
        }));

        return video
    }

}