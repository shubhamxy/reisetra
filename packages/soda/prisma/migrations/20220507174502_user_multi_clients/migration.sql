/*
  Warnings:

  - You are about to drop the column `clientId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_clientId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "clientId";

-- CreateTable
CREATE TABLE "_ClientToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClientToUser_AB_unique" ON "_ClientToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ClientToUser_B_index" ON "_ClientToUser"("B");

-- AddForeignKey
ALTER TABLE "_ClientToUser" ADD FOREIGN KEY ("A") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClientToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
