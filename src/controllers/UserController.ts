import { Request, Response } from "express";
import { UserService } from "@/services/UserService";
import { inject, injectable } from "tsyringe";

@injectable()
export class UserController {
  constructor(@inject("UserService") private userService: UserService) {}
  async getUsers(req: Request, res: Response) {
    const users = await this.userService.getUsers();
    res.json(users);
  }

  async createUser(req: Request, res: Response) {
    const user = await this.userService.createUser(req.body);
    res.status(201).json(user);
  }
}
