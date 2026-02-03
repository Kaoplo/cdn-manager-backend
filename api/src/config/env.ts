import dotenv from "dotenv";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL || typeof DATABASE_URL !== "string") {
    throw new Error("Missing or invalid DATABASE_URL environment variable");
}

const REDIS_URL = process.env.REDIS_URL;
if (!REDIS_URL || typeof REDIS_URL !== "string") {
    throw new Error("Missing or invalid REDIS_URL environment variable");
}

export const env = {
    DATABASE_URL,
    REDIS_URL,
    STORAGE_PATH: process.env.STORAGE_PATH || "../storage"
}