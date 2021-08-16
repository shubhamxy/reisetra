/*
  Warnings:

  - The primary key for the `File` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `File` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_userId_fkey";

-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_cartId_fkey";

-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_cartId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_brand_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_inventoryId_fkey";

-- DropForeignKey
ALTER TABLE "Secrets" DROP CONSTRAINT "Secrets_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- AlterTable
ALTER TABLE "File" DROP CONSTRAINT "File_pkey",
DROP COLUMN "id",
ALTER COLUMN "fileType" DROP NOT NULL,
ALTER COLUMN "contentType" DROP NOT NULL,
ADD CONSTRAINT "File_pkey" PRIMARY KEY ("url");

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "slug" TEXT;

-- CreateTable
CREATE TABLE "FormResponse" (
    "id" TEXT NOT NULL,
    "data" JSONB NOT NULL DEFAULT '{}',
    "formId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FormResponse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- AddForeignKey
ALTER TABLE "Secrets" ADD CONSTRAINT "Secrets_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_brand_fkey" FOREIGN KEY ("brand") REFERENCES "Company"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_id_fkey" FOREIGN KEY ("id") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormResponse" ADD CONSTRAINT "FormResponse_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "Cart.userId_unique" RENAME TO "Cart_userId_key";

-- RenameIndex
ALTER INDEX "CartItem.productId_cartId_unique" RENAME TO "CartItem_productId_cartId_key";

-- RenameIndex
ALTER INDEX "Inventory.sku_unique" RENAME TO "Inventory_sku_key";

-- RenameIndex
ALTER INDEX "Offer.label_unique" RENAME TO "Offer_label_key";

-- RenameIndex
ALTER INDEX "Product.inventoryId_unique" RENAME TO "Product_inventoryId_key";

-- RenameIndex
ALTER INDEX "User.email_unique" RENAME TO "User_email_key";

-- RenameIndex
ALTER INDEX "User.oauthId_unique" RENAME TO "User_oauthId_key";

-- RenameIndex
ALTER INDEX "User.phone_unique" RENAME TO "User_phone_key";
