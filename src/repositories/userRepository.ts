import { User } from "../models/User";

// Mock database
const users: User[] = [
  {
    id: 1,
    email: "ari@mail.com",
    name: "ari",
  },
  {
    id: 2,
    email: "amrad@mail.com",
    name: "amrad",
  },
];

export const findAll = async () => {
  return users;
};

export const create = async (userData: User) => {
  const newUser = { id: users.length + 1, ...userData };
  users.push(newUser);
  return newUser;
};
