CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"number" text NOT NULL,
	"pin" text NOT NULL,
	"isVerified" boolean DEFAULT false NOT NULL,
	CONSTRAINT "users_number_unique" UNIQUE("number")
);
