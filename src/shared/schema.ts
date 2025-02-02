import * as notes from "@/features/notes/notes.schema.ts";

export const mainSchema = {
  ...notes,
};

export type TSchema = typeof mainSchema;
