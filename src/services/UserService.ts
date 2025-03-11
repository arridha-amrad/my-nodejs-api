import { CreateUser, UpdateUserDTO } from "@/dto/User";
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
  async getUserById(userId: string) {
    return this.userRepository.findById(userId);
  }
  async createUser(data: CreateUser) {
    return this.userRepository.create(data);
  }
  async removeUser(userId: string) {
    return this.userRepository.remove(userId);
  }
  async updateUser(userId: string, data: UpdateUserDTO) {
    return this.userRepository.update(userId, data);
  }
}
