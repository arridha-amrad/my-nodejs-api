import { container } from "tsyringe";
import { UserController } from "@/controllers/UserController";
import { UserRepository } from "@/repositories/UserRepository";
import { UserService } from "@/services/UserService";

// Register dependencies
container.register("UserRepository", { useClass: UserRepository });
container.register("UserService", { useClass: UserService });
container.register("UserController", { useClass: UserController });

// Export the container (optional)
export { container };
