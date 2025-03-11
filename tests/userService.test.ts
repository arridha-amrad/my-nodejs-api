import { container } from "tsyringe";
import { UserService } from "@/services/UserService";
import { UserRepository } from "@/repositories/UserRepository";

// Mock the UserRepository
jest.mock("@/repositories/UserRepository");

describe("UserService", () => {
  let userService: UserService;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Register mock dependencies
    container.register("UserRepository", {
      useValue: { findAll: jest.fn(), create: jest.fn() },
    });
    container.register("UserService", { useClass: UserService });

    // Resolve dependencies
    userService = container.resolve(UserService);
    userRepository = container.resolve("UserRepository");
  });

  it("should get users", async () => {
    // Mock the repository's findAll method
    userRepository.findAll.mockResolvedValue([
      { id: 1, name: "John Doe", email: "john@example.com" },
    ]);

    // Call the service method
    const users = await userService.getUsers();

    // Assertions
    expect(users).toEqual([
      { id: 1, name: "John Doe", email: "john@example.com" },
    ]);
    expect(userRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it("should create a user", async () => {
    // Mock the repository's create method
    userRepository.create.mockResolvedValue({
      id: 2,
      name: "Jane Doe",
      email: "jane@example.com",
    });

    // Call the service method
    const newUser = await userService.createUser({
      name: "Jane Doe",
      email: "jane@example.com",
    });

    // Assertions
    expect(newUser).toEqual({
      id: 2,
      name: "Jane Doe",
      email: "jane@example.com",
    });
    expect(userRepository.create).toHaveBeenCalledWith({
      name: "Jane Doe",
      email: "jane@example.com",
    });
    expect(userRepository.create).toHaveBeenCalledTimes(1);
  });
});
