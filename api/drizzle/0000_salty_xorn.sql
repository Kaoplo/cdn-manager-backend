CREATE TABLE "videos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"original_filename" varchar(255) NOT NULL,
	"status" varchar(50) NOT NULL,
	"output_path" varchar(255),
	"created_at" timestamp DEFAULT now()
);
