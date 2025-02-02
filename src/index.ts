import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

import notesRoutes from "@/features/notes/notes.routes.ts";

const app = express();

app.use(cors());
app.use(express.json());

// JSON parsing error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({
      error: 'Invalid JSON',
      message: 'The request body contains malformed JSON'
    });
  }
  next(err);
});

app.get("/healthcheck", (req, res) => {
  res.send({ timestamp: new Date().toISOString(), status: "ok" });
});

app.get("/", (req, res) => {
  res.send({ timestamp: new Date().toISOString(), status: "ok" });
});

app.use("/api/notes", notesRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
