-- CreateEnum
CREATE TYPE "LogType" AS ENUM ('TEXT', 'IMAGE');

-- CreateTable
CREATE TABLE "Log" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "type" "LogType" NOT NULL DEFAULT E'TEXT',
    "content" TEXT NOT NULL,
    "logbookId" INTEGER NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_logbookId_fkey" FOREIGN KEY ("logbookId") REFERENCES "Logbook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
