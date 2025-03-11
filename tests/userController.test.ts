import request from "supertest";
import express from "express";
import { container } from "tsyringe";
import { UserController } from "@/controllers/UserController";
import { UserRepository } from "@/repositories/UserRepository";

describe("UserController", () => {
  let app: express.Application;

  beforeAll(() => {
    // Create an Express app
    app = express();
    app.use(express.json());

    const userController = container.resolve(UserController);

    // Define routes
    app.get("/users", (req, res) => userController.getUsers(req, res));
    app.post("/users", (req, res) => userController.createUser(req, res));
  });

  it("should get users", async () => {
    // Mock the repository's findAll method
    (
      container.resolve<UserRepository>("UserRepository").findAll as jest.Mock
    ).mockResolvedValue([
      { id: 1, name: "John Doe", email: "john@example.com" },
    ]);

    // Make a GET request
    const response = await request(app).get("/users");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 1, name: "John Doe", email: "john@example.com" },
    ]);
  });

  it("should create a user", async () => {
    // Mock the repository's create method
    (
      container.resolve<UserRepository>("UserRepository").create as jest.Mock
    ).mockResolvedValue({
      id: 2,
      name: "Jane Doe",
      email: "jane@example.com",
    });

    // Make a POST request
    const response = await request(app)
      .post("/users")
      .send({ name: "Jane Doe", email: "jane@example.com" });

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: 2,
      name: "Jane Doe",
      email: "jane@example.com",
    });
  });
});
