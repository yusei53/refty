/*
  Warnings:

  - The primary key for the `ReflectionFolder` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ReflectionFolder` table. All the data in the column will be lost.
  - The required column `folderId` was added to the `ReflectionFolder` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Reflection" DROP CONSTRAINT "Reflection_folderId_fkey";

-- AlterTable
ALTER TABLE "ReflectionFolder" DROP CONSTRAINT "ReflectionFolder_pkey",
DROP COLUMN "id",
ADD COLUMN     "folderId" TEXT NOT NULL,
ADD CONSTRAINT "ReflectionFolder_pkey" PRIMARY KEY ("folderId");

-- AddForeignKey
ALTER TABLE "Reflection" ADD CONSTRAINT "Reflection_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "ReflectionFolder"("folderId") ON DELETE SET NULL ON UPDATE CASCADE;
