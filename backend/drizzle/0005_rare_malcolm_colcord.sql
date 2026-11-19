ALTER TABLE "purchases" DROP CONSTRAINT "purchases_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "purchases" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "purchases" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "purchases" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "purchases" ADD COLUMN "userId" text;--> statement-breakpoint
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;