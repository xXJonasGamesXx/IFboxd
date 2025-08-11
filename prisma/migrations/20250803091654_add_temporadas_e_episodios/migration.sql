-- CreateTable
CREATE TABLE "public"."Temporada" (
    "id" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "serieId" TEXT NOT NULL,

    CONSTRAINT "Temporada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Episodio" (
    "id" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "lancamento" TIMESTAMP(3),
    "temporadaId" TEXT NOT NULL,

    CONSTRAINT "Episodio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CodigoConvite" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL,
    "usado" BOOLEAN NOT NULL DEFAULT false,
    "usadoPor" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CodigoConvite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CodigoConvite_codigo_key" ON "public"."CodigoConvite"("codigo");

-- AddForeignKey
ALTER TABLE "public"."Temporada" ADD CONSTRAINT "Temporada_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES "public"."Serie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Episodio" ADD CONSTRAINT "Episodio_temporadaId_fkey" FOREIGN KEY ("temporadaId") REFERENCES "public"."Temporada"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
