import { Request, Response } from "express";
import * as userService from "../services/userService";

export const getUsers = async (req: Request, res: Response) => {
  const users = await userService.getUsers();
  res.status(200).json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
};
