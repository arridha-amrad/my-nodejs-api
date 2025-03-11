import * as userRepository from "../repositories/userRepository";
import { User } from "../models/User";

export const getUsers = async () => {
  return await userRepository.findAll();
};

export const createUser = async (userData: User) => {
  return await userRepository.create(userData);
};
