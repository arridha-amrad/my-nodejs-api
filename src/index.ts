import express from "express";
import cors from "cors";
import { PORT } from "./config/env";
import routes from "./routes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", routes);

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export { app, server };
