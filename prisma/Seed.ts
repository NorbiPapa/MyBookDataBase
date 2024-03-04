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
        { statusname: 'Wants to read' },
        { statusname: 'Completed' },
        { statusname: 'Reading' },
        { statusname: 'On Hold' },
        { statusname: 'Dropped' },
      ],
    });

    for (let index = 0; index < 20; index++) {
      await prisma.books.create({
        data: {
          bookname: faker.word.words() + ' ' + faker.word.words(),
          release: faker.date.anytime(),
          writer: faker.person.fullName(),
          genre: {
            connect: {
              id: faker.number.int({ min: 1, max: 5 }),
            },
          },
        },
      });
    }

    await prisma.user.createMany({
      data: [
        {
          username: 'user1',
          email: 'user1@example.com',
          password:
            '$argon2id$v=19$m=16,t=2,p=1$SUJkNVRtaElROHJkdjNjOQ$TGXW0Zmu0CYwAlHS/eQhJg',
        },
        // pw: test
        {
          username: 'admin',
          email: 'admin@example.com',
          password:
            '$argon2id$v=19$m=16,t=2,p=1$SUJkNVRtaElROHJkdjNjOQ$TGXW0Zmu0CYwAlHS/eQhJg',
          role: 'admin',
        },
      ],
    });
  } finally {
    prisma.$disconnect();
  }
}

main();
