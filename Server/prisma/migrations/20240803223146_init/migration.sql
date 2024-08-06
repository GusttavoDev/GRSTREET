/*
  Warnings:

  - Added the required column `storeLogo` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeName` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "storeLogo" TEXT NOT NULL,
ADD COLUMN     "storeName" TEXT NOT NULL;
