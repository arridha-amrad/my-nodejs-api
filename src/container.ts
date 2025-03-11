import "reflect-metadata";
import { container } from "tsyringe";
import { UserRepository } from "@/repositories/UserRepository";
import { UserService } from "@/services/UserService";
import { UserController } from "@/controllers/UserController";

// Register classes
container.register("UserRepository", { useClass: UserRepository });
container.register("UserService", { useClass: UserService });
container.register("UserController", { useClass: UserController });

export { container };
