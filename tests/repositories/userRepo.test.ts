import { UserRepository } from "@/repositories/UserRepository";
import { users } from "@/db/schema";
import db from "@/db";
import { v4 } from "uuid";
import { InferSelectModel } from "drizzle-orm";

jest.mock("@/db", () => ({
  select: jest.fn().mockReturnThis(),
  from: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  insert: jest.fn().mockReturnThis(),
  values: jest.fn().mockReturnThis(),
  returning: jest.fn().mockReturnThis(),
  delete: jest.fn().mockReturnThis(),
  update: jest.fn().mockReturnThis(),
  set: jest.fn().mockReturnThis(),
}));

type User = InferSelectModel<typeof users>;

describe("UserRepository", () => {
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
    jest.clearAllMocks();
  });

  it("should retrieve all users", async () => {
    const mockUsers: User[] = [
      {
        id: "8c333b39-90d8-4eaa-b7fe-913c233bce4c",
        name: "John Doe",
        username: "john_doe",
        email: "johndoe@gmail.com",
        password: "freePalestine9",
        role: "user",
        provider: "credentials",
        createdAt: new Date("2025-03-11T16:10:11.678Z"),
        updatedAt: new Date("2025-03-11T16:10:11.678Z"),
      },
    ];
    (db.select().from as jest.Mock).mockResolvedValue(mockUsers);

    const result = await userRepository.findAll();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          email: expect.any(String),
        }),
      ])
    );
    expect(db.select).toHaveBeenCalled();
  });

  it("should create a user", async () => {
    const userdata = {
      name: "jane Doe",
      username: "jane_doe",
      email: "janedoe@gmail.com",
      password: "freePalestine9",
    };
    const resultCreation = {
      id: "8c333b39-90d8-4eaa-b7fe-913c233bcxxx",
      name: "jane Doe",
      username: "jane_doe",
      email: "janedoe@gmail.com",
      password: "freePalestine9",
      role: "user",
      provider: "credentials",
      createdAt: new Date("2025-03-11T16:10:11.678Z"),
      updatedAt: new Date("2025-03-11T16:10:11.678Z"),
    };

    (
      db.insert(users).values(userdata).returning as jest.Mock
    ).mockResolvedValue([resultCreation]);

    const result = await userRepository.create(userdata);
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          email: expect.any(String),
        }),
      ])
    );
    expect(db.insert).toHaveBeenCalledWith(users);
  });
});
