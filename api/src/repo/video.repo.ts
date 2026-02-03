import { db } from "../db";
import { videos } from "../db/schema/videos";
import { eq } from "drizzle-orm";

export const videoRepo = {
    async create({original_filename, status, output_path}: any) {
        const values: any = { original_filename, status, output_path };

        try {
            const rows = await db.insert(videos)
                .values(values)
                .returning();

            return rows[0] ?? null;
        } catch (err: any) {
            console.error("videoRepo.create failed. values:", values);
        }
    },

    async findById(id: string) {
        const rows = await db.select().from(videos).where(eq(videos.id, id));
        return rows[0] ?? null;
    },

    async updateStatus(id: string, status: string, output_path?: string) {
        const rows = await db.update(videos)
            .set({status, output_path})
            .where(eq(videos.id, id))
            .returning();

        return rows[0] ?? null;
    }
}