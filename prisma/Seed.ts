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

  } finally {
    prisma.$disconnect();
  }
}

main();
