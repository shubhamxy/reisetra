/*
  Warnings:

  - You are about to drop the column `extra` on the `Product` table. All the data in the column will be lost.
  - The `size` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `color` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "extra",
ADD COLUMN     "details" JSONB,
ADD COLUMN     "dimentions" JSONB,
DROP COLUMN "size",
ADD COLUMN     "size" JSONB,
DROP COLUMN "color",
ADD COLUMN     "color" JSONB;
