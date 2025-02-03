import "dotenv/config";
import express from "express";
import cors from "cors";

import notesRoutes from "@/features/notes/notes.routes.ts";

const app = express();

app.use(cors());
app.use(express.json());

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
