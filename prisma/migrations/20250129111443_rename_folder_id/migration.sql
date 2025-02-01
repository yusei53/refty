/*
  Warnings:

  - You are about to drop the column `folderId` on the `Reflection` table. All the data in the column will be lost.
  - The primary key for the `ReflectionFolder` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `ReflectionFolder` table. All the data in the column will be lost.
  - You are about to drop the column `folderId` on the `ReflectionFolder` table. All the data in the column will be lost.
  - The required column `folderUUID` was added to the `ReflectionFolder` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Reflection" DROP CONSTRAINT "Reflection_folderId_fkey";

-- AlterTable
ALTER TABLE "Reflection" DROP COLUMN "folderId",
ADD COLUMN     "folderUUID" TEXT;

-- AlterTable
ALTER TABLE "ReflectionFolder" DROP CONSTRAINT "ReflectionFolder_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "folderId",
ADD COLUMN     "folderUUID" TEXT NOT NULL,
ADD CONSTRAINT "ReflectionFolder_pkey" PRIMARY KEY ("folderUUID");

-- AddForeignKey
ALTER TABLE "Reflection" ADD CONSTRAINT "Reflection_folderUUID_fkey" FOREIGN KEY ("folderUUID") REFERENCES "ReflectionFolder"("folderUUID") ON DELETE SET NULL ON UPDATE CASCADE;
