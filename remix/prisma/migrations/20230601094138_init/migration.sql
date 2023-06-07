/*
  Warnings:

  - Added the required column `updateAt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "newsletters" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "newsletters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "newsletters_user_id_idx" ON "newsletters"("user_id");

-- AddForeignKey
ALTER TABLE "newsletters" ADD CONSTRAINT "newsletters_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
