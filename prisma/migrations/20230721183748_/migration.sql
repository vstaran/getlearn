-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "cuid" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "firstname" TEXT,
    "lastname" TEXT,
    "patronymic" TEXT,
    "instagram" TEXT,
    "confirmationCode" TEXT,
    "avatarUrl" TEXT,
    "role" "ROLE" NOT NULL DEFAULT 'USER',
    "hashedPassword" TEXT NOT NULL,
    "hashedRefreshToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_cuid_key" ON "User"("cuid");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
