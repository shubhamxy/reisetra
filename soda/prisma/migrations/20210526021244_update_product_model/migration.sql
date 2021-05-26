/*
  Warnings:

  - The `size` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `color` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `details` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "details" SET NOT NULL,
DROP COLUMN "size",
ADD COLUMN     "size" INTEGER[],
DROP COLUMN "color",
ADD COLUMN     "color" INTEGER[];
