/*
  Warnings:

  - You are about to drop the `Log` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "EntryType" AS ENUM ('TEXT', 'IMAGE');

-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_logbookId_fkey";

-- DropTable
DROP TABLE "Log";

-- DropEnum
DROP TYPE "LogType";

-- CreateTable
CREATE TABLE "Entry" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "type" "EntryType" NOT NULL DEFAULT E'TEXT',
    "content" TEXT NOT NULL,
    "logbookId" INTEGER NOT NULL,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_logbookId_fkey" FOREIGN KEY ("logbookId") REFERENCES "Logbook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
