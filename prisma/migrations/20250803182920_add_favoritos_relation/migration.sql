-- CreateTable
CREATE TABLE "public"."_FilmesFavoritos" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FilmesFavoritos_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_SeriesFavoritas" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SeriesFavoritas_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_FilmesFavoritos_B_index" ON "public"."_FilmesFavoritos"("B");

-- CreateIndex
CREATE INDEX "_SeriesFavoritas_B_index" ON "public"."_SeriesFavoritas"("B");

-- AddForeignKey
ALTER TABLE "public"."_FilmesFavoritos" ADD CONSTRAINT "_FilmesFavoritos_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Filme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FilmesFavoritos" ADD CONSTRAINT "_FilmesFavoritos_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_SeriesFavoritas" ADD CONSTRAINT "_SeriesFavoritas_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Serie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_SeriesFavoritas" ADD CONSTRAINT "_SeriesFavoritas_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
