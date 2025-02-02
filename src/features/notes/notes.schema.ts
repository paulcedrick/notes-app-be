import { boolean, serial } from "drizzle-orm/pg-core";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const notesSchema = pgTable("notes", {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  isCompleted: boolean('is_completed').default(false),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
});

export type TNote = typeof notesSchema.$inferSelect;
export type TNewNote = typeof notesSchema.$inferInsert;
