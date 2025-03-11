import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(5, "Minimum 5 characters are required"),
  email: z.string().email("Invalid email"),
  username: z
    .string()
    .min(5, "Minimum 5 characters are required")
    .max(50, "Max 50 characters are allowed"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export type CreateUser = z.infer<typeof createUserSchema>;

export const updateUserSchema = createUserSchema.partial().extend({
  role: z.enum(["admin", "user"]).optional(),
});

export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
