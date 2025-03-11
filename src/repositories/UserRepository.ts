import db from "@/db";
import { users } from "@/db/schema";
import { UpdateUserDTO } from "@/dto/User";
import { eq } from "drizzle-orm";
import { injectable } from "tsyringe";

@injectable()
export class UserRepository {
  async findAll() {
    return db.select().from(users);
  }

  async create(userData: typeof users.$inferInsert) {
    return db.insert(users).values(userData).returning();
  }

  async findById(userId: string) {
    return db.select().from(users).where(eq(users.id, userId));
  }

  async remove(userId: string) {
    return db.delete(users).where(eq(users.id, userId)).returning();
  }
  async update(userId: string, data: UpdateUserDTO) {
    return db.update(users).set(data).where(eq(users.id, userId)).returning();
  }
}
