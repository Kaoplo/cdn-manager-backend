import dotenv from "dotenv"

dotenv.config();

export const env = {
    DATABASE_URL: process.env.DATABASE_URL!,
    REDIS_URL: process.env.REDIS_URL!,
    STORAGE_PATH: process.env.STORAGE_PATH || "../storage",
}