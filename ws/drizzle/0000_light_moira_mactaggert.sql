CREATE TYPE "public"."message_type" AS ENUM('text', 'image', 'video', 'voice', 'doc');--> statement-breakpoint
CREATE TYPE "public"."message_status_per_person" AS ENUM('not_delivered', 'delivered', 'read');--> statement-breakpoint
CREATE TABLE "chat_members" (
	"chat_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"role" text DEFAULT 'member' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "chat_members_chat_id_user_id_pk" PRIMARY KEY("chat_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "chats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"is_group" boolean NOT NULL,
	"group_name" text,
	"group_picture" text,
	"created_by" uuid NOT NULL,
	"last_message_id" uuid,
	"last_message_content" text,
	"last_message_timestamp" timestamp with time zone,
	"last_message_sender" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"chat_id" uuid NOT NULL,
	"sender_id" uuid NOT NULL,
	"content" text NOT NULL,
	"message_type" "message_type" NOT NULL,
	"reply_to" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "message_status" (
	"message_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"status" "message_status_per_person" DEFAULT 'not_delivered' NOT NULL,
	"delivered_at" timestamp with time zone,
	"read_at" timestamp with time zone,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "message_status_message_id_user_id_pk" PRIMARY KEY("message_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"phone_number" varchar(255) NOT NULL,
	"pin" varchar(255) NOT NULL,
	"profile_picture" text,
	"last_seen" timestamp with time zone,
	"is_verified" boolean DEFAULT false NOT NULL,
	"verified_at" timestamp with time zone,
	"google_email" varchar(255),
	"google_access_token" text,
	"google_access_expiry" bigint,
	"google_refresh_token" text,
	"google_refresh_expiry" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_phoneNumber_unique" UNIQUE("phone_number")
);
--> statement-breakpoint
ALTER TABLE "chat_members" ADD CONSTRAINT "chat_members_chat_id_chats_id_fk" FOREIGN KEY ("chat_id") REFERENCES "public"."chats"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chat_members" ADD CONSTRAINT "chat_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chats" ADD CONSTRAINT "chats_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chats" ADD CONSTRAINT "chats_last_message_id_messages_id_fk" FOREIGN KEY ("last_message_id") REFERENCES "public"."messages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chats" ADD CONSTRAINT "chats_last_message_sender_users_id_fk" FOREIGN KEY ("last_message_sender") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_chat_id_chats_id_fk" FOREIGN KEY ("chat_id") REFERENCES "public"."chats"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_users_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_reply_to_messages_id_fk" FOREIGN KEY ("reply_to") REFERENCES "public"."messages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_status" ADD CONSTRAINT "message_status_message_id_messages_id_fk" FOREIGN KEY ("message_id") REFERENCES "public"."messages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_status" ADD CONSTRAINT "message_status_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;