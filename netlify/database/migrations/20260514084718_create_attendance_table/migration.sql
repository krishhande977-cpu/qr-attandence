CREATE TABLE "attendance" (
	"id" serial PRIMARY KEY,
	"student_id" text NOT NULL,
	"name" text NOT NULL,
	"status" text DEFAULT 'Present' NOT NULL,
	"subject" text,
	"created_at" timestamp DEFAULT now()
);
