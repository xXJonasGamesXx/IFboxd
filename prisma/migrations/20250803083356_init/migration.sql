-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('VISITANTE', 'ADMIN');

-- CreateTable
CREATE TABLE "public"."Usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'VISITANTE',

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Perfil" (
    "id" TEXT NOT NULL,
    "bio" TEXT,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Perfil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Filme" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "lancamento" TIMESTAMP(3),
    "diretor" TEXT,
    "criadorId" TEXT NOT NULL,

    CONSTRAINT "Filme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Serie" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "lancamento" TIMESTAMP(3),
    "diretor" TEXT,
    "criadorId" TEXT NOT NULL,

    CONSTRAINT "Serie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Genero" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Genero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Avaliacao" (
    "id" TEXT NOT NULL,
    "nota" INTEGER NOT NULL,
    "comentario" TEXT,
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioId" TEXT NOT NULL,
    "filmeId" TEXT,
    "serieId" TEXT,

    CONSTRAINT "Avaliacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_FilmeGenero" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FilmeGenero_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_SerieGenero" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SerieGenero_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "public"."Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Perfil_usuarioId_key" ON "public"."Perfil"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Genero_nome_key" ON "public"."Genero"("nome");

-- CreateIndex
CREATE INDEX "_FilmeGenero_B_index" ON "public"."_FilmeGenero"("B");

-- CreateIndex
CREATE INDEX "_SerieGenero_B_index" ON "public"."_SerieGenero"("B");

-- AddForeignKey
ALTER TABLE "public"."Perfil" ADD CONSTRAINT "Perfil_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Filme" ADD CONSTRAINT "Filme_criadorId_fkey" FOREIGN KEY ("criadorId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Serie" ADD CONSTRAINT "Serie_criadorId_fkey" FOREIGN KEY ("criadorId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Avaliacao" ADD CONSTRAINT "Avaliacao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Avaliacao" ADD CONSTRAINT "Avaliacao_filmeId_fkey" FOREIGN KEY ("filmeId") REFERENCES "public"."Filme"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Avaliacao" ADD CONSTRAINT "Avaliacao_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES "public"."Serie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FilmeGenero" ADD CONSTRAINT "_FilmeGenero_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Filme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FilmeGenero" ADD CONSTRAINT "_FilmeGenero_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Genero"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_SerieGenero" ADD CONSTRAINT "_SerieGenero_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Genero"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_SerieGenero" ADD CONSTRAINT "_SerieGenero_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Serie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
