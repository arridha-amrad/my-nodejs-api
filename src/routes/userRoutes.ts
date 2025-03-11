import express from "express";
import { UserController } from "@/controllers/UserController";
import * as md from "@/middleware/user";
import { container } from "@/container";

const router = express.Router();

const userController = container.resolve(UserController);

router.get("", userController.getUsers.bind(userController));
router.post("", md.createUser, userController.createUser.bind(userController));
router.get("/:id", userController.getUserById.bind(userController));
router.delete("/:id", userController.removeUser.bind(userController));
router.put(
  "/:id",
  md.updateUser,
  userController.updateUser.bind(userController)
);

export default router;
