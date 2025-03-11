import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const rolesEnum = pgEnum("roles", ["user", "admin"]);
export const providerEnum = pgEnum("providers", ["credentials", "google"]);

export const users = pgTable(
  "users",
  {
    id: text("id")
      .primaryKey()
      .default(sql`uuid_generate_v4()`)
      .notNull(),
    name: varchar({ length: 255 }).notNull(),
    username: varchar({ length: 100 }).unique().notNull(),
    email: varchar({ length: 100 }).notNull().unique(),
    password: text(),
    role: rolesEnum().default("user").notNull(),
    provider: providerEnum().default("credentials").notNull(),
    createdAt: timestamp("created_at", {
      mode: "date",
      withTimezone: true,
      precision: 3,
    })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", {
      mode: "date",
      withTimezone: true,
      precision: 3,
    })
      .defaultNow()
      .$onUpdateFn(() => new Date())
      .notNull(),
  },
  (table) => [
    index("users_idx_username").on(table.username),
    index("users_idx_email").on(table.email),
  ]
);

export const tokens = pgTable(
  "tokens",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    hash: text().notNull(),
    deviceId: text("device_id")
      .default(sql`uuid_generate_v4()`)
      .notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    expiredAt: timestamp("expired_at", {
      mode: "date",
      withTimezone: true,
    })
      .$defaultFn(() => new Date(Date.now() + 60 * 60 * 1000))
      .notNull(),
  },
  (table) => [
    index("tokens_idx_userid_device_id").on(table.deviceId, table.userId),
  ]
);
