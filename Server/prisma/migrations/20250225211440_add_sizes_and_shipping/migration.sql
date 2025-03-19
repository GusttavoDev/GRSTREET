/*
  Warnings:

  - Added the required column `cel_number` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "cel_number" TEXT NOT NULL,
ADD COLUMN     "cep" INTEGER NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "cpf" TEXT,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "neighborhood" TEXT NOT NULL,
ADD COLUMN     "number" INTEGER NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL,
ADD COLUMN     "userName" TEXT NOT NULL;
