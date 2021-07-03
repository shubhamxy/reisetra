-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "description" TEXT,
ALTER COLUMN "value" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "description" TEXT,
ALTER COLUMN "value" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "description" TEXT,
ALTER COLUMN "value" DROP NOT NULL;
