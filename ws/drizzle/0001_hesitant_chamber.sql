ALTER TABLE "chatMembers" ALTER COLUMN "chat_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "chatMembers" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "messageStatus" ALTER COLUMN "message_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "messageStatus" ALTER COLUMN "user_id" SET NOT NULL;