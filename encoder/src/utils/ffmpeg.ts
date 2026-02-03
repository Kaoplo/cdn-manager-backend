import { spawn } from "bun";
import fs from "fs";
import path from "path";

export async function encodeToHLS(inputPath: string, outputDir: string) {
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const hlsPath = path.join(outputDir, "hls");
  if (!fs.existsSync(hlsPath)) fs.mkdirSync(hlsPath);

  const args = [
    "-i", inputPath,
    "-preset", "fast",
    "-g", "48",
    "-sc_threshold", "0",
    "-map", "0:v:0",
    "-map", "0:a:0",
    "-c:v", "libx264",
    "-b:v:0", "3000k",
    "-maxrate:v:0", "3000k",
    "-bufsize:v:0", "6000k",
    "-c:a", "aac",
    "-ar", "48000",
    "-b:a", "128k",
    "-f", "hls",
    "-hls_time", "4",
    "-hls_playlist_type", "vod",
    path.join(hlsPath, "master.m3u8")
  ];

  const ffmpeg = spawn(["ffmpeg", ...args]);

  await ffmpeg.exited;

  return hlsPath;
}