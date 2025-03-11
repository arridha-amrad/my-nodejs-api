import "reflect-metadata";
import "tsconfig-paths/register";

import express from "express";
import cors from "cors";
import { PORT } from "./config/env";

import { container } from "./container";
import { UserController } from "./controllers/UserController";
import { userRoutes } from "./routes/userRoutes";

// Resolve dependencies
const userController = container.resolve(UserController);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", userRoutes(userController));

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export { app, server };
