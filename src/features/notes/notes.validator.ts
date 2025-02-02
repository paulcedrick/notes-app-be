import { z } from "zod";

export const createNoteValidator = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
});

export const updateNoteValidator = createNoteValidator.partial();

export const getNoteParamsValidator = z.object({
  id: z.coerce.number({
    required_error: "Id is required",
    invalid_type_error: "Id must be a number",
  }),
});

export type TCreateNoteValidator = z.infer<typeof createNoteValidator>;
export type TUpdateNoteValidator = z.infer<typeof updateNoteValidator>;
export type TGetNoteParamsValidator = z.infer<typeof getNoteParamsValidator>;
