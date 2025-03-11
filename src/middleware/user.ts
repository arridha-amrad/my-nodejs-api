import { createUserSchema, updateUserSchema } from "@/dto/User";
import { NextFunction, Request, Response } from "express";

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const validationResult = createUserSchema.safeParse(req.body);
  if (!validationResult.success) {
    res.status(400).json(validationResult.error.flatten().fieldErrors);
    return;
  }
  req.body = validationResult.data;
  next();
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const validationResult = updateUserSchema.safeParse(req.body);
  if (!validationResult.success) {
    res.status(400).json(validationResult.error.flatten().fieldErrors);
    return;
  }
  req.body = validationResult.data;
  next();
};
