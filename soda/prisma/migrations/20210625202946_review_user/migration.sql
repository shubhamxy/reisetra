-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Review" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
