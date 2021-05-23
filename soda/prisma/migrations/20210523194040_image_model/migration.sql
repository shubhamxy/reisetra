-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "taxCode" TEXT;

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT,
    "key" TEXT,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Image" ADD FOREIGN KEY ("id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
