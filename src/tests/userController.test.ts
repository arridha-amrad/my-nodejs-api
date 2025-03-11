import request from "supertest";
import { server } from "..";
import { User } from "../models/User";

afterAll((done) => {
  server.close(done);
});

describe("User Controller", () => {
  it("should get all users", async () => {
    const res = await request(server).get("/api/users");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    res.body.forEach((user: User) => {
      expect(user).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        email: expect.any(String),
      });
    });
  });

  it("should create a new user", async () => {
    const res = await request(server)
      .post("/api/users")
      .send({ name: "John", email: "john@example.com" });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
  });
});
