import type { Config } from "@netlify/functions";
import { db } from "../../db/index.js";
import { attendance } from "../../db/schema.js";
import { desc } from "drizzle-orm";

export default async (req: Request) => {
  if (req.method === "GET") {
    const records = await db.select().from(attendance).orderBy(desc(attendance.createdAt));
    return Response.json(
      records.map((r) => ({
        id: r.id,
        student_id: r.studentId,
        name: r.name,
        status: r.status,
        subject: r.subject,
        created_at: r.createdAt,
      }))
    );
  }

  if (req.method === "POST") {
    const body = await req.json();
    const { student_id, name, status, subject } = body;

    if (!student_id || !name) {
      return Response.json({ error: "student_id and name are required" }, { status: 400 });
    }

    const [record] = await db
      .insert(attendance)
      .values({
        studentId: student_id,
        name,
        status: status || "Present",
        subject: subject || null,
      })
      .returning();

    return Response.json(
      {
        id: record.id,
        student_id: record.studentId,
        name: record.name,
        status: record.status,
        subject: record.subject,
        created_at: record.createdAt,
      },
      { status: 201 }
    );
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: "/api/attendance",
};
