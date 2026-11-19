ALTER TABLE "history" RENAME COLUMN "user_id" TO "userId";--> statement-breakpoint
ALTER TABLE "history" DROP CONSTRAINT "history_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "history" ADD CONSTRAINT "history_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;