/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Permission` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Permission` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Permission_name_key";

-- AlterTable
ALTER TABLE "public"."Permission" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Permission_slug_key" ON "public"."Permission"("slug");
