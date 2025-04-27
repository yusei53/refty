-- AlterTable
ALTER TABLE "Reflection" ADD COLUMN     "isAwareness" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isDailyReflection" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isInputLog" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isLearning" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isMonologue" BOOLEAN NOT NULL DEFAULT false;
