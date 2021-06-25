/*
  Warnings:

  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_ProductToTag" DROP CONSTRAINT "_ProductToTag_B_fkey";

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "tagId" TEXT;

-- AlterTable
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_pkey",
ADD COLUMN     "styles" TEXT[],
ADD PRIMARY KEY ("label");

-- AddForeignKey
ALTER TABLE "File" ADD FOREIGN KEY ("tagId") REFERENCES "Tag"("label") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToTag" ADD FOREIGN KEY ("B") REFERENCES "Tag"("label") ON DELETE CASCADE ON UPDATE CASCADE;
