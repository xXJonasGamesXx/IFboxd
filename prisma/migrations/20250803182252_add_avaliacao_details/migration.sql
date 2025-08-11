-- AlterTable
ALTER TABLE "public"."Avaliacao" ADD COLUMN     "contem_spoiler" BOOLEAN,
ADD COLUMN     "data_assistido" TIMESTAMP(3),
ADD COLUMN     "reassistido" BOOLEAN;
