import "reflect-metadata";
import "tsconfig-paths/register";

import cors from "cors";
import express from "express";
import { PORT } from "./config/env";

import userRoutes from "./routes/userRoutes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/v1/users", userRoutes);

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export { app, server };
