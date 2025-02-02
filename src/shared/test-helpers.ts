import db from "@/shared/db.ts";
import { mainSchema } from "@/shared/schema.ts";

export const createDumyNotes = async () => {
  const notes = await db.insert(mainSchema.notesSchema).values([
    { title: "Note 1", content: "Content 1" },
    { title: "Note 2", content: "Content 2" },
    { title: "Note 3", content: "Content 3" },
  ]).returning();

  return notes;
}
export const createDummyNote = async () => {
  const note = await db.insert(mainSchema.notesSchema).values({ title: "Note 1", content: "Content 1" }).returning();
  return note[0];
}