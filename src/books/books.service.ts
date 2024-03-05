import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BooksService {
  constructor(private readonly db: PrismaService) {}

  create(createBookDto: CreateBookDto) {
    return this.db.books.create({
      data: {
        bookname: createBookDto.bookname,
        writer: createBookDto.writer,
        release: createBookDto.release,
        genre: {
          connectOrCreate: {
            where: {
              genrename: createBookDto.genre,
            },
            create: {
              genrename: createBookDto.genre
            },
          },
        },
      },
    });
  }

  findAll() {
    return `This action returns all books`;
  }

  findOne(id: string) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
