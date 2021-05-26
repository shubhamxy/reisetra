/*
  Warnings:

  - You are about to drop the column `dimentions` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "dimentions",
ADD COLUMN     "dimensions" INTEGER[];
