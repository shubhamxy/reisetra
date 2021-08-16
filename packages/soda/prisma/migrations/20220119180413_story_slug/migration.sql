/*
  Warnings:

  - You are about to drop the column `id` on the `File` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Story` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
-- ALTER TABLE "File" DROP COLUMN "id";

-- AlterTable
ALTER TABLE "Story" ADD COLUMN "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Story_slug_key" ON "Story"("slug");
