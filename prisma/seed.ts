// ARQUIVO: prisma/seed.ts
import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Função para pegar itens aleatórios de uma lista, sem repetição
function getRandomSubarray<T>(arr: T[], size: number): T[] {
  const shuffled = arr.slice(0);
  let i = arr.length;
  let temp: T;
  let index: number;
  while (i--) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(0, size);
}

async function main() {
  console.log('Iniciando o processo de seed...');

  // 1. Limpeza completa do banco de dados na ordem correta
  console.log('Deletando dados antigos...');
  await prisma.avaliacao.deleteMany({});
  await prisma.episodio.deleteMany({});
  await prisma.temporada.deleteMany({});
  // As linhas abaixo foram removidas pois causavam o erro. A limpeza das tabelas principais já resolve as relações.
  await prisma.filme.deleteMany({});
  await prisma.serie.deleteMany({});
  await prisma.perfil.deleteMany({});
  await prisma.usuario.deleteMany({});
  await prisma.genero.deleteMany({});

  // 2. Criação dos Gêneros
  console.log('Criando Gêneros...');
  await prisma.genero.createMany({
    data: [
      { nome: 'Terror' },
      { nome: 'Ficção Científica' },
      { nome: 'Comédia' },
      { nome: 'Animação' },
      { nome: 'Aventura' },
      { nome: 'Drama' },
      { nome: 'Suspense' },
      { nome: 'Fantasia' },
      { nome: 'Ação' },
      { nome: 'Crime' },
      { nome: 'Sitcom' },
    ],
  });

  // 3. Criação dos Usuários
  console.log('Criando Usuários...');
  const mariposa = await prisma.usuario.create({
    data: {
      nome: 'Mariposa',
      email: 'mariposa@gmail.com',
      senha: await bcrypt.hash('mariposa123', 10),
      role: Role.VISITANTE,
      perfil: {
        create: {
          bio: 'Defensora de pântanos e contos de fadas. Shrek é o melhor filme já feito.',
        },
      },
    },
  });
  const juliana = await prisma.usuario.create({
    data: {
      nome: 'Juliana',
      email: 'juliana@gmail.com',
      senha: await bcrypt.hash('juliana123', 10),
      role: Role.VISITANTE,
      perfil: {
        create: {
          bio: 'Especialista em sobrevivência zumbi e fã de The Walking Dead.',
        },
      },
    },
  });
  const john = await prisma.usuario.create({
    data: {
      nome: 'John',
      email: 'john@gmail.com',
      senha: await bcrypt.hash('john123', 10),
      role: Role.ADMIN,
      perfil: {
        create: { bio: 'A amizade é mágica! E também sou o Admin por aqui.' },
      },
    },
  });
  const lorenna = await prisma.usuario.create({
    data: {
      nome: 'Lorenna',
      email: 'lorenna@gmail.com',
      senha: await bcrypt.hash('lorenna123', 10),
      role: Role.VISITANTE,
      perfil: {
        create: {
          bio: 'Analisando a sétima arte, especialmente pôneis coloridos.',
        },
      },
    },
  });
  const olavo = await prisma.usuario.create({
    data: {
      nome: 'Olavo',
      email: 'olavo@gmail.com',
      senha: await bcrypt.hash('olavo123', 10),
      role: Role.VISITANTE,
      perfil: {
        create: { bio: 'Assustador profissional e grande fã de Monstros S.A.' },
      },
    },
  });
  const allUsers = [mariposa, juliana, john, lorenna, olavo];

  // 4. Buscar Gêneros para associar
  console.log('Buscando IDs dos Gêneros...');
  const allGenres = await prisma.genero.findMany();
  const getGenreId = (name: string) => {
    const genre = allGenres.find((g) => g.nome === name);
    if (!genre) throw new Error(`Gênero '${name}' não encontrado!`);
    return genre.id;
  };

  // 5. Criação de Filmes com Pôsteres
  console.log('Criando Filmes...');
  const filmesData = [
    {
      titulo: 'My Little Pony: Equestria Girls',
      descricao:
        'Através de um espelho mágico, Twilight Sparkle viaja para um universo alternativo...',
      diretor: 'Jayson Thiessen',
      lancamento: new Date('2013-06-16T00:00:00.000Z'),
      posterUrl:
        'https://m.media-amazon.com/images/M/MV5BMGQzZDA4MTktZTAxMC00ZmJiLThmODUtZjRlODcxMjQzODc5XkEyXkFqcGc@._V1_.jpg',
      criadorId: john.id,
      generos: {
        connect: [
          { id: getGenreId('Animação') },
          { id: getGenreId('Fantasia') },
        ],
      },
    },
    {
      titulo: 'Shrek',
      descricao:
        'Um ogro mal-humorado embarca numa missão para resgatar uma princesa...',
      diretor: 'Andrew Adamson',
      lancamento: new Date('2001-05-18T00:00:00.000Z'),
      posterUrl:
        'https://uauposters.com.br/media/catalog/product/4/7/470320230615-uau-posters-shrek-fiona-burro-filmes-3.jpg',
      criadorId: john.id,
      generos: {
        connect: [
          { id: getGenreId('Animação') },
          { id: getGenreId('Comédia') },
          { id: getGenreId('Fantasia') },
        ],
      },
    },
    {
      titulo: 'Monstros S.A.',
      descricao:
        'Para gerar energia para sua cidade, monstros precisam assustar crianças...',
      diretor: 'Pete Docter',
      lancamento: new Date('2001-11-02T00:00:00.000Z'),
      posterUrl:
        'https://a-static.mlcdn.com.br/1500x1500/poster-cartaz-monstros-s-a-d-pop-arte-poster/poparteskins2/15938521562/0927a049585ed5703e6ff8a28b6d4e51.jpeg',
      criadorId: john.id,
      generos: {
        connect: [
          { id: getGenreId('Animação') },
          { id: getGenreId('Comédia') },
        ],
      },
    },
    {
      titulo: 'Meu Malvado Favorito',
      descricao:
        'Um super-vilão planeia roubar a lua, mas seus planos mudam...',
      diretor: 'Pierre Coffin & Chris Renaud',
      lancamento: new Date('2010-07-09T00:00:00.000Z'),
      posterUrl:
        'https://m.media-amazon.com/images/I/61-8UaTgUGL._UF894,1000_QL80_.jpg',
      criadorId: john.id,
      generos: {
        connect: [
          { id: getGenreId('Animação') },
          { id: getGenreId('Comédia') },
        ],
      },
    },
    {
      titulo: 'Alien, o 8.º Passageiro',
      descricao: 'Uma tripulação a bordo de uma nave espacial comercial...',
      diretor: 'Ridley Scott',
      lancamento: new Date('1979-05-25T00:00:00.000Z'),
      posterUrl:
        'https://static.wikia.nocookie.net/alienanthology/images/e/e2/Alien_-_HD_poster.jpg/revision/latest?cb=20240826180931',
      criadorId: john.id,
      generos: {
        connect: [
          { id: getGenreId('Terror') },
          { id: getGenreId('Ficção Científica') },
        ],
      },
    },
    {
      titulo: 'Pânico',
      descricao:
        'Um ano após o assassinato de sua mãe, uma adolescente é aterrorizada...',
      diretor: 'Wes Craven',
      lancamento: new Date('1996-12-20T00:00:00.000Z'),
      posterUrl:
        'https://image.tmdb.org/t/p/original/cJj2gYzkPFSqYGGOhfLgeANlXkB.jpg',
      criadorId: john.id,
      generos: {
        connect: [{ id: getGenreId('Terror') }, { id: getGenreId('Suspense') }],
      },
    },
  ];
  for (const data of filmesData) {
    await prisma.filme.create({ data });
  }

  // 6. Criação de Séries com Pôsteres
  console.log('Criando Séries...');
  const seriesData = [
    {
      titulo: 'My Little Pony: A Amizade é Mágica',
      descricao: 'Twilight Sparkle aprende sobre a magia da amizade...',
      diretor: 'Lauren Faust',
      lancamento: new Date('2010-10-10T00:00:00.000Z'),
      posterUrl:
        'https://m.media-amazon.com/images/I/71Rm1KH1u+L._UF894,1000_QL80_.jpg',
      criadorId: john.id,
      generos: {
        connect: [
          { id: getGenreId('Animação') },
          { id: getGenreId('Fantasia') },
        ],
      },
    },
    {
      titulo: 'Stranger Things',
      descricao:
        'Quando um menino desaparece, uma pequena cidade descobre um mistério...',
      diretor: 'The Duffer Brothers',
      lancamento: new Date('2016-07-15T00:00:00.000Z'),
      posterUrl:
        'https://m.media-amazon.com/images/I/71VVjPUtogL._UF894,1000_QL80_.jpg',
      criadorId: john.id,
      generos: {
        connect: [
          { id: getGenreId('Terror') },
          { id: getGenreId('Ficção Científica') },
          { id: getGenreId('Drama') },
        ],
      },
    },
    {
      titulo: 'Breaking Bad',
      descricao:
        'Um professor de química com cancro do pulmão vira-se para o fabrico...',
      diretor: 'Vince Gilligan',
      lancamento: new Date('2008-01-20T00:00:00.000Z'),
      posterUrl:
        'https://m.media-amazon.com/images/I/51fWOBx3agL._UF894,1000_QL80_.jpg',
      criadorId: john.id,
      generos: {
        connect: [
          { id: getGenreId('Drama') },
          { id: getGenreId('Suspense') },
          { id: getGenreId('Crime') },
        ],
      },
    },
    {
      titulo: 'The Walking Dead',
      descricao:
        'Um grupo de sobreviventes luta para se manter vivo num mundo pós-apocalíptico...',
      diretor: 'Frank Darabont',
      lancamento: new Date('2010-10-31T00:00:00.000Z'),
      posterUrl:
        'https://m.media-amazon.com/images/I/91RcukUwCFL._UF1000,1000_QL80_.jpg',
      criadorId: john.id,
      generos: {
        connect: [{ id: getGenreId('Terror') }, { id: getGenreId('Drama') }],
      },
    },
    {
      titulo: 'Todo Mundo Odeia o Chris',
      descricao: 'Uma sitcom narrada pelo comediante Chris Rock...',
      diretor: 'Chris Rock & Ali LeRoi',
      lancamento: new Date('2005-09-22T00:00:00.000Z'),
      posterUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsTYIJd98xhP7ykOWYMNz0OeQK7_Fj2HRImA&s',
      criadorId: john.id,
      generos: {
        connect: [{ id: getGenreId('Comédia') }, { id: getGenreId('Sitcom') }],
      },
    },
    {
      titulo: 'The Office',
      descricao:
        'Uma comédia no estilo mocumentário que retrata o dia a dia dos funcionários...',
      diretor: 'Greg Daniels',
      lancamento: new Date('2005-03-24T00:00:00.000Z'),
      posterUrl:
        'https://m.media-amazon.com/images/I/615MPacH9qL._UF894,1000_QL80_.jpg',
      criadorId: john.id,
      generos: {
        connect: [{ id: getGenreId('Comédia') }, { id: getGenreId('Sitcom') }],
      },
    },
  ];
  for (const data of seriesData) {
    await prisma.serie.create({ data });
  }

  // 7. Criação de Temporadas e Episódios...
  console.log('Criando Temporadas e Episódios...');
  const allSeriesFromDb = await prisma.serie.findMany();
  for (const serie of allSeriesFromDb) {
    const s01 = await prisma.temporada.create({
      data: { numero: 1, serieId: serie.id },
    });
    await prisma.episodio.createMany({
      data: [
        { numero: 1, titulo: 'Episódio Piloto', temporadaId: s01.id },
        { numero: 2, titulo: 'O Início de Tudo', temporadaId: s01.id },
      ],
    });
  }

  // 8. Criação das Avaliações...
  console.log('Criando Avaliações...');
  const allFilmesFromDb = await prisma.filme.findMany();
  const shrek = allFilmesFromDb.find((f) => f.titulo === 'Shrek');
  const monstrosSA = allFilmesFromDb.find((f) => f.titulo === 'Monstros S.A.');
  const equestriaGirls = allFilmesFromDb.find(
    (f) => f.titulo === 'My Little Pony: Equestria Girls',
  );
  const theWalkingDead = allSeriesFromDb.find(
    (s) => s.titulo === 'The Walking Dead',
  );
  const myLittlePonySerie = allSeriesFromDb.find(
    (s) => s.titulo === 'My Little Pony: A Amizade é Mágica',
  );

  await prisma.avaliacao.createMany({
    data: [
      {
        nota: 5,
        comentario:
          'O melhor filme da vida, mudou a minha existência! Uma obra-prima.',
        usuarioId: mariposa.id,
        filmeId: shrek.id,
      },
      {
        nota: 5,
        comentario:
          'Incrível! Me prendeu do início ao fim, uma das melhores séries de zumbi.',
        usuarioId: juliana.id,
        serieId: theWalkingDead.id,
      },
      {
        nota: 5,
        comentario:
          'Simplesmente perfeito! As músicas e a história são fantásticas.',
        usuarioId: john.id,
        filmeId: equestriaGirls.id,
      },
      {
        nota: 5,
        comentario:
          'A melhor série de animação! A magia da amizade nunca falha.',
        usuarioId: john.id,
        serieId: myLittlePonySerie.id,
      },
      {
        nota: 5,
        comentario:
          'Meu filme de conforto. Engraçado e emocionante na medida certa.',
        usuarioId: olavo.id,
        filmeId: monstrosSA.id,
      },
      {
        nota: 4,
        comentario: 'Muito fofo e divertido! As personagens são cativantes.',
        usuarioId: lorenna.id,
        serieId: myLittlePonySerie.id,
      },
      {
        nota: 4,
        comentario: 'Adorei as personagens e a aventura. Um clássico!',
        usuarioId: lorenna.id,
        filmeId: equestriaGirls.id,
      },
    ],
  });

  // Lógica para garantir que cada obra tenha pelo menos 3 avaliações...
  const allObras = [...allFilmesFromDb, ...allSeriesFromDb];
  const comentarios = [
    'Gostei bastante!',
    'Um clássico moderno.',
    'Vale a pena assistir.',
    'Não é o meu favorito, mas é bom.',
    'Excelente fotografia.',
  ];
  for (const obra of allObras) {
    const isFilme = 'diretor' in obra && !!obra.diretor;
    const obraId = { [isFilme ? 'filmeId' : 'serieId']: obra.id };
    const existingReviewsCount = await prisma.avaliacao.count({
      where: obraId,
    });
    let neededReviews = 3 - existingReviewsCount;
    if (neededReviews > 0) {
      const existingReviewerIds = (
        await prisma.avaliacao.findMany({
          where: obraId,
          select: { usuarioId: true },
        })
      ).map((r) => r.usuarioId);
      const potentialReviewers = allUsers.filter(
        (u) => !existingReviewerIds.includes(u.id),
      );
      const reviewers = getRandomSubarray(potentialReviewers, neededReviews);
      for (const reviewer of reviewers) {
        await prisma.avaliacao
          .create({
            data: {
              nota: Math.floor(Math.random() * 2) + 4,
              comentario:
                comentarios[Math.floor(Math.random() * comentarios.length)],
              usuarioId: reviewer.id,
              ...obraId,
            },
          })
          .catch(() => {});
      }
    }
  }

  console.log('Processo de seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
