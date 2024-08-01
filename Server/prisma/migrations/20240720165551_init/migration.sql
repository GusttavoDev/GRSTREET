/*
  Warnings:

  - The `profile_img` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "profile_img",
ADD COLUMN     "profile_img" BYTEA;
