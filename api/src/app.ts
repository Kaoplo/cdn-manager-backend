import { Elysia } from "elysia";
import { uploadRoutes } from "./routes/upload";

export const app = new Elysia()
    .use(uploadRoutes)