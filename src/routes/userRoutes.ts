import express from "express";
import { UserController } from "@/controllers/UserController";

export const userRoutes = (userController: UserController) => {
  const router = express.Router();

  router.get("/users", (req, res) => userController.getUsers(req, res));
  router.post("/users", (req, res) => userController.createUser(req, res));

  return router;
};
