CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE "public"."providers" AS ENUM ('credentials', 'google');

--> statement-breakpoint
CREATE TYPE "public"."roles" AS ENUM ('user', 'admin');

--> statement-breakpoint
CREATE TABLE
	"users" (
		"id" text PRIMARY KEY DEFAULT uuid_generate_v4 () NOT NULL,
		"name" varchar(255) NOT NULL,
		"username" varchar(100) NOT NULL,
		"email" varchar(100) NOT NULL,
		"password" text,
		"role" "roles" DEFAULT 'user' NOT NULL,
		"provider" "providers" DEFAULT 'credentials' NOT NULL,
		"created_at" timestamp(3)
		with
			time zone DEFAULT now () NOT NULL,
			"updated_at" timestamp(3)
		with
			time zone DEFAULT now () NOT NULL,
			CONSTRAINT "users_username_unique" UNIQUE ("username"),
			CONSTRAINT "users_email_unique" UNIQUE ("email")
	);

--> statement-breakpoint
CREATE INDEX "users_idx_username" ON "users" USING btree ("username");

--> statement-breakpoint
CREATE INDEX "users_idx_email" ON "users" USING btree ("email");