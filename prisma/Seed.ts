import { PrismaClient, Books, Genres } from '@prisma/client';
const prisma = new PrismaClient();
import { Faker, faker } from '@faker-js/faker';

async function main() {
  try {
    await prisma.genres.createMany({
      data: [
        { genrename: 'Fantasy' },
        { genrename: 'Romance' },
        { genrename: 'Horror' },
        { genrename: 'Crime' },
        { genrename: 'Comedy' },
        { genrename: 'Realism' },
        { genrename: 'Adventure' },
        { genrename: 'Philosophy' },
        { genrename: 'Sci-fi' },
        { genrename: 'History' },
        { genrename: 'Literature' },
        { genrename: 'Biography' },
        { genrename: 'Fable' },
        { genrename: 'Short Story' },
        { genrename: 'Poem' },
        { genrename: 'Tragedy' },
        { genrename: 'Existentialism' },
        {genrename: 'Absurdism'},
      ],
    });
    await prisma.status.createMany({
      data: [
        { statusname: 'Plan to read' },
        { statusname: 'Completed' },
        { statusname: 'Reading' },
        { statusname: 'On Hold' },
        { statusname: 'Dropped' },
      ],
    });
    await prisma.books.create({
      data: {
        bookname: 'Bűn és Bűnhődés',
        writer: 'Fjodor Mihajlovics Dosztojevszkij',
        release: 1866,
        genre: {
          connect: { genrename: 'Realism' },
        },
      },
    });
    await prisma.books.create({
      data: {
        bookname: 'Fehér Éjszakák',
        writer: 'Fjodor Mihajlovics Dosztojevszkij',
        release: 1848,
        genre: {
          connect: { genrename: 'Romance' },
        },
      },
    });
    await prisma.books.create({
      data: {
        bookname: 'Ördögök',
        writer: 'Fjodor Mihajlovics Dosztojevszkij',
        release: 1872,
        genre: {
          connect: { genrename: 'Realism' },
        },
      },
    });
    await prisma.books.create({
      data: {
        bookname: 'A Karamazov testvérek',
        writer: 'Fjodor Mihajlovics Dosztojevszkij',
        release: 1880,
        genre: {
          connect: { genrename: 'Realism' },
        },
      },
    });
    await prisma.books.create({
      data: {
        bookname: 'A játékos',
        writer: 'Fjodor Mihajlovics Dosztojevszkij',
        release: 1866,
        genre: {
          connect: { genrename: 'Realism' },
        },
      },
    });
    await prisma.books.create({
      data: {
        bookname: 'Feljegyzések az egérlyukból',
        writer: 'Fjodor Mihajlovics Dosztojevszkij',
        release: 1864,
        genre: {
          connect: { genrename: 'Realism' },
        },
      },
    });
    await prisma.books.create({
      data: {
        bookname: 'Közöny',
        writer: 'Albert Camus',
        release: 1942,
        genre: {
          connect: { genrename: 'Existentialism' },
        },
      },
    });
    await prisma.books.create({
      data: {
        bookname: 'Pestis',
        writer: 'Albert Camus',
        release: 1947,
        genre: {
          connect: { genrename: 'Existentialism' },
        },
      },
    });
    await prisma.books.create({
      data: {
        bookname: 'Sziszüphosz Mítosza',
        writer: 'Albert Camus',
        release: 1942,
        genre: {
          connect: { genrename: 'Absurdism' },
        },
      },
    });
  } finally {
    prisma.$disconnect();
  }
}

main();
