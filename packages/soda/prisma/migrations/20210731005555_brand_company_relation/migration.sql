-- AddForeignKey
ALTER TABLE "Product" ADD FOREIGN KEY ("brand") REFERENCES "Company"("name") ON DELETE CASCADE ON UPDATE CASCADE;