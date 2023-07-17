CREATE TABLE "Account" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" UUID NOT NULL,
  "providerType" TEXT NOT NULL,
  "providerId" TEXT NOT NULL,
  "providerAccountId" TEXT NOT NULL,
  "refreshToken" TEXT,
  "accessToken" TEXT,
  "accessTokenExpires" TIMESTAMPTZ,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL,

  FOREIGN KEY ("userId") REFERENCES "User" ("id"),
  CONSTRAINT "unique_provider" UNIQUE ("providerId", "providerAccountId")
);

CREATE TABLE "Session" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" UUID NOT NULL,
  "expires" TIMESTAMPTZ NOT NULL,
  "sessionToken" TEXT NOT NULL UNIQUE,
  "accessToken" TEXT NOT NULL UNIQUE,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL,

  FOREIGN KEY ("userId") REFERENCES "User" ("id")
);

CREATE TABLE "User" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" TEXT,
  "email" TEXT UNIQUE,
  "emailVerified" TIMESTAMPTZ,
  "image" TEXT,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL
);

CREATE TABLE "VerificationRequest" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "identifier" TEXT NOT NULL,
  "token" TEXT NOT NULL UNIQUE,
  "expires" TIMESTAMPTZ NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL,

  CONSTRAINT "unique_identifier_token" UNIQUE ("identifier", "token")
);
