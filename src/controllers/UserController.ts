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

  async getUserById(req: Request, res: Response) {
    const userId = req.params.id;
    const [user] = await this.userService.getUserById(userId);
    res.json(user);
  }

  async createUser(req: Request, res: Response) {
    const user = await this.userService.createUser(req.body);
    res.status(201).json(user);
  }

  async removeUser(req: Request, res: Response) {
    await this.userService.removeUser(req.params.id);
    res.status(204).send("Deleted");
  }

  async updateUser(req: Request, res: Response) {
    const user = await this.userService.updateUser(req.params.id, req.body);
    res.status(200).json(user);
  }
}
