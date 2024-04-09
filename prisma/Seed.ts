import { PrismaClient, Books, Genres } from '@prisma/client';
const prisma = new PrismaClient();
import { Faker, faker } from '@faker-js/faker';

async function main() {
  try {
    await prisma.genres.createMany({
      data: [
        { genrename: 'Fantasy' },
        { genrename: 'Romantikus' },
        { genrename: 'Horror' },
        { genrename: 'Krimi' },
        { genrename: 'Komédia' },
        { genrename: 'Realizmus' },
        { genrename: 'Kaland' },
        { genrename: 'Filozófia' },
        { genrename: 'Sci-fi' },
        { genrename: 'Történelem' },
        { genrename: 'Szép Irodalom' },
        { genrename: 'Életrajz' },
        { genrename: 'Mese' },
        { genrename: 'Novella' },
        { genrename: 'Vers' },
        { genrename: 'Tragédia' },
        { genrename: 'Egzisztencializmus' },
        {genrename: 'Abszurdizmus'},
      ],
    });
    await prisma.status.createMany({
      data: [
        { statusname: 'Tervben van' },
        { statusname: 'Kiolvasva' },
        { statusname: 'Most olvasom' },
        { statusname: 'Szüneteltetem' },
        { statusname: 'Abbahagytam' },
      ],
    });
    await prisma.books.create({
      data: {
        bookname: 'Bűn és Bűnhődés',
        writer: 'Fjodor Mihajlovics Dosztojevszkij',
        release: 1866,
        genre: {
          connect: { genrename: 'Realizmus' },
        },
      },
    });
    await prisma.books.create({
      data: {
        bookname: 'Fehér Éjszakák',
        writer: 'Fjodor Mihajlovics Dosztojevszkij',
        release: 1848,
        genre: {
          connect: { genrename: 'Romantikus' },
        },
      },
    });
    await prisma.books.create({
      data: {
        bookname: 'Ördögök',
        writer: 'Fjodor Mihajlovics Dosztojevszkij',
        release: 1872,
        genre: {
          connect: { genrename: 'Realizmus' },
        },
      },
    });
    await prisma.books.create({
      data: {
        bookname: 'A Karamazov testvérek',
        writer: 'Fjodor Mihajlovics Dosztojevszkij',
        release: 1880,
        genre: {
          connect: { genrename: 'Realizmus' },
        },
      },
    });
    await prisma.books.create({
      data: {
        bookname: 'A játékos',
        writer: 'Fjodor Mihajlovics Dosztojevszkij',
        release: 1866,
        genre: {
          connect: { genrename: 'Realizmus' },
        },
      },
    });
    await prisma.books.create({
      data: {
        bookname: 'Feljegyzések az egérlyukból',
        writer: 'Fjodor Mihajlovics Dosztojevszkij',
        release: 1864,
        genre: {
          connect: { genrename: 'Realizmus' },
        },
      },
    });
    await prisma.books.create({
      data: {
        bookname: 'Közöny',
        writer: 'Albert Camus',
        release: 1942,
        genre: {
          connect: { genrename: 'Egzisztencializmus' },
        },
      },
    });
    await prisma.books.create({
      data: {
        bookname: 'Pestis',
        writer: 'Albert Camus',
        release: 1947,
        genre: {
          connect: { genrename: 'Egzisztencializmus' },
        },
      },
    });
    await prisma.books.create({
      data: {
        bookname: 'Sziszüphosz Mítosza',
        writer: 'Albert Camus',
        release: 1942,
        genre: {
          connect: { genrename: 'Abszurdizmus' },
        },
      },
    });
  } finally {
    prisma.$disconnect();
  }
}

main();
