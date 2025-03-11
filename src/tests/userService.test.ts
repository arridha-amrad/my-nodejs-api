import * as userRepository from "../repositories/userRepository";
import { getUsers, createUser } from "../services/userService";
import { User } from "../models/User";

// Mock the userRepository module
jest.mock("../repositories/userRepository");

describe("UserService", () => {
  // Sample user data for testing
  const mockUser: User = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
  };

  // Clear all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test for getUsers
  describe("getUsers", () => {
    it("should return a list of users", async () => {
      // Mock the repository's findAll function
      (userRepository.findAll as jest.Mock).mockResolvedValue([mockUser]);

      // Call the service function
      const users = await getUsers();

      // Assertions
      expect(users).toEqual([mockUser]);
      expect(userRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it("should handle errors when fetching users", async () => {
      // Mock the repository's findAll function to throw an error
      (userRepository.findAll as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      // Assert that the error is thrown
      await expect(getUsers()).rejects.toThrow("Database error");
      expect(userRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  // Test for createUser
  describe("createUser", () => {
    it("should create and return a new user", async () => {
      // Mock the repository's create function
      (userRepository.create as jest.Mock).mockResolvedValue(mockUser);

      // Call the service function
      const newUser = await createUser(mockUser);

      // Assertions
      expect(newUser).toEqual(mockUser);
      expect(userRepository.create).toHaveBeenCalledWith(mockUser);
      expect(userRepository.create).toHaveBeenCalledTimes(1);
    });

    it("should handle errors when creating a user", async () => {
      // Mock the repository's create function to throw an error
      (userRepository.create as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      // Assert that the error is thrown
      await expect(createUser(mockUser)).rejects.toThrow("Database error");
      expect(userRepository.create).toHaveBeenCalledWith(mockUser);
      expect(userRepository.create).toHaveBeenCalledTimes(1);
    });
  });
});
