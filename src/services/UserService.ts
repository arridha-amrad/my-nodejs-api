import { UserRepository } from "@/repositories/UserRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class UserService {
  constructor(
    @inject("UserRepository") private userRepository: UserRepository
  ) {}

  async getUsers() {
    return this.userRepository.findAll();
  }

  async createUser(userData: { name: string; email: string }) {
    return this.userRepository.create(userData);
  }
}
