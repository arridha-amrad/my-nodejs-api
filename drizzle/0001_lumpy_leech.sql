CREATE TABLE "tokens" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "tokens_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"hash" text NOT NULL,
	"device_id" text DEFAULT uuid_generate_v4() NOT NULL,
	"user_id" text NOT NULL,
	"expired_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "tokens_idx_userid_device_id" ON "tokens" USING btree ("device_id","user_id");