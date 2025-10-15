CREATE TYPE "public"."message_type" AS ENUM('text', 'image', 'video', 'voice', 'doc');--> statement-breakpoint
CREATE TYPE "public"."message_status_per_person" AS ENUM('not_delivered', 'delivered', 'read');--> statement-breakpoint
CREATE TABLE "chat_members" (
	"chatId" uuid NOT NULL,
	"userId" uuid NOT NULL,
	"role" text DEFAULT 'member' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "chat_members_chatId_userId_pk" PRIMARY KEY("chatId","userId")
);
--> statement-breakpoint
CREATE TABLE "chats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"isGroup" boolean NOT NULL,
	"groupName" text,
	"groupPicture" text,
	"createdBy" uuid NOT NULL,
	"lastMessageId" uuid,
	"lastMessageContent" text,
	"lastMessageTimestamp" timestamp with time zone,
	"lastMessageSender" uuid,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"chatId" uuid NOT NULL,
	"senderId" uuid NOT NULL,
	"content" text NOT NULL,
	"messageType" "message_type" NOT NULL,
	"replyTo" uuid,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "message_status" (
	"messageId" uuid NOT NULL,
	"userId" uuid NOT NULL,
	"status" "message_status_per_person" DEFAULT 'not_delivered' NOT NULL,
	"deliveredAt" timestamp with time zone,
	"readAt" timestamp with time zone,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "message_status_messageId_userId_pk" PRIMARY KEY("messageId","userId")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"phoneNumber" varchar(255) NOT NULL,
	"pin" varchar(255) NOT NULL,
	"profilePicture" text,
	"lastSeen" timestamp with time zone,
	"isVerified" boolean DEFAULT false NOT NULL,
	"verifiedAt" timestamp with time zone,
	"googleEmail" varchar(255),
	"googleAccessToken" text,
	"googleAccessExpiry" text,
	"googleRefreshToken" text,
	"googleRefreshExpiry" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_phoneNumber_unique" UNIQUE("phoneNumber")
);
--> statement-breakpoint
ALTER TABLE "chat_members" ADD CONSTRAINT "chat_members_chatId_chats_id_fk" FOREIGN KEY ("chatId") REFERENCES "public"."chats"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chat_members" ADD CONSTRAINT "chat_members_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chats" ADD CONSTRAINT "chats_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chats" ADD CONSTRAINT "chats_lastMessageId_messages_id_fk" FOREIGN KEY ("lastMessageId") REFERENCES "public"."messages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chats" ADD CONSTRAINT "chats_lastMessageSender_users_id_fk" FOREIGN KEY ("lastMessageSender") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_chatId_chats_id_fk" FOREIGN KEY ("chatId") REFERENCES "public"."chats"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_senderId_users_id_fk" FOREIGN KEY ("senderId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_replyTo_messages_id_fk" FOREIGN KEY ("replyTo") REFERENCES "public"."messages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_status" ADD CONSTRAINT "message_status_messageId_messages_id_fk" FOREIGN KEY ("messageId") REFERENCES "public"."messages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_status" ADD CONSTRAINT "message_status_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;