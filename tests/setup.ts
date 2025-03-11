import "reflect-metadata";

import { container } from "tsyringe";
import { UserService } from "@/services/UserService";
import { UserController } from "@/controllers/UserController";

container.register("UserRepository", {
  useValue: { findAll: jest.fn(), create: jest.fn() },
});
container.register("UserService", { useClass: UserService });
container.register("UserController", { useClass: UserController });

// Optional: Add global setup logic
beforeAll(() => {
  console.log("Global setup: Running before all tests");
});

// Optional: Add global teardown logic
afterAll(() => {
  console.log("Global teardown: Running after all tests");
});
