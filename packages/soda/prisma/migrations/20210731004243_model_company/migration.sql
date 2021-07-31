-- AlterEnum
ALTER TYPE "OrderStatus" ADD VALUE 'DELIVERED';

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "faqs" JSONB NOT NULL DEFAULT E'{}',
ALTER COLUMN "rating" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Company" (
    "name" TEXT NOT NULL,

    PRIMARY KEY ("name")
);
