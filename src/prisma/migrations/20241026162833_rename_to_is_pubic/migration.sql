/*
  Warnings:

  - You are about to drop the column `isPublish` on the `Reflection` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Reflection" DROP COLUMN "isPublish",
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false;
