import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const attendance = pgTable("attendance", {
  id: serial().primaryKey(),
  studentId: text("student_id").notNull(),
  name: text().notNull(),
  status: text().notNull().default("Present"),
  subject: text(),
  createdAt: timestamp("created_at").defaultNow(),
});
