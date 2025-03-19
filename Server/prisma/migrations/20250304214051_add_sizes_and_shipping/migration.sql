-- AlterTable
ALTER TABLE "ProductPurchase" ADD COLUMN     "declared_value" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "height" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "length" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "package_format" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "sku" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "weight" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "width" TEXT NOT NULL DEFAULT '';
