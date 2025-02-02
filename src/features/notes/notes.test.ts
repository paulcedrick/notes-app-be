import { describe, it, expect } from "vitest";
import express from "express";
import request from "supertest";
import { mainSchema } from "@/shared/schema.ts";
import notesRouter from "@/features/notes/notes.routes.ts";
import { createDummyNote, createDumyNotes } from "@/shared/test-helpers.ts";

describe("Notes Routes", () => {
  const app = express();
  app.use(express.json());
  app.use("/notes", notesRouter);

  describe("GET /notes", () => {
    it("should return all notes", async () => {
      const notes = await createDumyNotes();
      const response = await request(app).get("/notes");
      const body = response.body as typeof mainSchema.notesSchema.$inferSelect[];

      expect(response.status).toBe(200);
      // reverse the notes array to match the order of the response
      const reversed = [...notes].reverse();

      reversed.forEach((note, index) => {
        expect(body[index]).toEqual(expect.objectContaining({
          title: note.title,
          content: note.content,
        }));
      });
    });
  });

  describe("GET /notes/:id", () => {
    it("should return a specific note", async () => {
      const note = await createDummyNote();
      const response = await request(app).get(`/notes/${note.id}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining(note));
    });

    it("should validate note id parameter", async () => {
      const response = await request(app).get("/notes/invalid-id");
      expect(response.status).toBe(400);
    });
  });

  describe("POST /notes", () => {
    it("should create a new note", async () => {
      const noteData = {
        title: `Test Note ${Math.random().toString(36).substring(2, 15)}`,
        content: `Test Content ${Math.random().toString(36).substring(2, 15)}`
      };

      const response = await request(app)
        .post("/notes")
        .send(noteData);

      const result = response.body as typeof mainSchema.notesSchema.$inferSelect

      expect(response.status).toBe(200);
      expect(result.title).toBe(noteData.title);
      expect(result.content).toBe(noteData.content);
    });

    it('should not accept empty title', async () => {
      const noteData = {
        title: "",
        content: "Test Content"
      };

      const response = await request(app)
        .post("/notes")
        .send(noteData);

      expect(response.status).toBe(400);
    })

    it("should validate note data", async () => {
      const invalidNote = {
        title: "", // Empty title should fail validation
        content: "Test Content"
      };

      const response = await request(app)
        .post("/notes")
        .send(invalidNote);

      expect(response.status).toBe(400);
    });
  });

  describe("PUT /notes/:id", () => {
    it("should update a note", async () => {
      const existingNote = await createDummyNote();
      const noteId = existingNote.id;
      const updateData = {
        title: `Updated Title ${Math.random().toString(36).substring(2, 15)}`,
        content: `Updated Content ${Math.random().toString(36).substring(2, 15)}`
      };

      const response = await request(app)
        .put(`/notes/${noteId}`)
        .send(updateData);

      const result = response.body as typeof mainSchema.notesSchema.$inferSelect

      expect(response.status).toBe(200);
      expect(result.title).toBe(updateData.title);
      expect(result.content).toBe(updateData.content);
    });

    it("should validate update data", async () => {
      const noteId = "123";
      const invalidUpdate = {
        title: "",
        content: "Updated Content"
      };

      const response = await request(app)
        .put(`/notes/${noteId}`)
        .send(invalidUpdate);

      expect(response.status).toBe(400);
    });
  });

  describe("DELETE /notes/:id", () => {
    it("should delete a note", async () => {
      const existingNote = await createDummyNote();
      const noteId = existingNote.id;
      const response = await request(app).delete(`/notes/${noteId}`);
      expect(response.status).toBe(200);
    });

    it("should validate note id parameter", async () => {
      const response = await request(app).delete("/notes/invalid-id");
      expect(response.status).toBe(400);
    });
  });
});
