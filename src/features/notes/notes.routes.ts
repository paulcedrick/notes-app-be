import { createNoteValidator, getNoteParamsValidator, updateNoteValidator } from "@/features/notes/notes.validator.ts";
import express, { Router } from "express";
import { validator } from "@/shared/validator.ts";
import { createNote, getNote, updateNote, deleteNote, getAllNotes } from "@/features/notes/notes.services.ts";

const router: Router = express.Router();

// Get all notes
router.get("/", async (req, res) => {
  const notes = await getAllNotes();
  res.status(200).json(notes);
});


// Get a specific note
router.get("/:id", validator({
  params: getNoteParamsValidator,
}, async ({ params, res }) => {
  const note = await getNote(params.id);

  if (!note) {
    return res.status(404).json({ message: "Note not found" });    
  }

  return res.status(200).json(note);
}));

// Create a new note
router.post("/", validator({
  body: createNoteValidator,
}, async ({ body, res }) => {
  const { title, content } = body;
  console.log({ body })
  const note = await createNote({ title, content });
  res.status(200).json(note);
}));

// Update a note
router.put("/:id", validator({
  params: getNoteParamsValidator,
  body: updateNoteValidator,
}, async ({ body, params, res }) => {
  const note = await updateNote(params.id, body);
  res.status(200).json(note);
}));

// Delete a note
router.delete("/:id", validator({
  params: getNoteParamsValidator,
}, async ({ params, res }) => {
  const note = await deleteNote(params.id);
  res.status(200).json(note);
}));

export default router;
