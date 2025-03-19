/*
  Warnings:

  - Added the required column `cel_number` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cel_number" BIGINT NOT NULL,
ALTER COLUMN "cpf" SET DATA TYPE BIGINT;
