import { TCreateNoteValidator, TUpdateNoteValidator } from "@/features/notes/notes.validator.ts";
import db from "@/shared/db.ts";
import { mainSchema } from "@/shared/schema.ts";
import { eq } from "drizzle-orm";

export const createNote = async (note: TCreateNoteValidator) => {
  try {
    const newNote = await db.insert(mainSchema.notesSchema).values({
      title: note.title,
      content: note.content
    }).returning();

    return newNote[0];
  } catch (err) {
    console.error(err);
    throw err
  }
};

export const getAllNotes = async () => {
  try {
    const notes = await db.query.notesSchema.findMany({
      orderBy: (notesSchema, { desc }) => [desc(notesSchema.id)]
    });
    return notes;
  } catch (err) {
    console.error(err);
    throw err
  }
};

export const getNote = async (id: number) => {
  try {
    const note = await db.query.notesSchema.findFirst({
      where: eq(mainSchema.notesSchema.id, id)
    });
    return note;
  } catch (err) {
    console.error(err);
    throw err
  }
};

export const updateNote = async (id: number, note: TUpdateNoteValidator) => {
  try {
    const updatedNote = await db.update(mainSchema.notesSchema).set({
      title: note.title,
      content: note.content
    }).where(eq(mainSchema.notesSchema.id, id)).returning();
    return updatedNote[0];
  } catch (err) {
    console.error(err);
    throw err
  }
};

export const deleteNote = async (id: number) => {
  try {
    const deletedNote = await db.delete(mainSchema.notesSchema).where(eq(mainSchema.notesSchema.id, id)).returning();
    return deletedNote[0];
  } catch (err) {
    console.error(err);
    throw err
  }
};
