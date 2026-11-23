ALTER TABLE "purchases" DROP CONSTRAINT "purchases_productId_products_id_fk";
--> statement-breakpoint
ALTER TABLE "purchases" ALTER COLUMN "productId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;