import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

export const videos = pgTable("videos", {
    id: uuid("id").primaryKey().defaultRandom(),
    original_filename: varchar("original_filename", { length: 255}).notNull(),
    status: varchar("status", { length: 50}).notNull(),
    output_path: varchar("output_path", { length: 255}),
    created_at: timestamp("created_at").defaultNow(),
});