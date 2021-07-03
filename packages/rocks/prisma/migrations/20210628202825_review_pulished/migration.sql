-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false;

-- AlterIndex
ALTER INDEX "Cart_userId_unique" RENAME TO "Cart.userId_unique";

-- AlterIndex
ALTER INDEX "Product_inventoryId_unique" RENAME TO "Product.inventoryId_unique";
