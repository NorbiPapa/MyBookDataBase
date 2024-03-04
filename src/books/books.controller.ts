import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma.service';

@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly db: PrismaService,
  ) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get('Name')
  searchByBookName(@Param('Name')name: string){
    return this.db.books.findMany({
      where: {bookname:name}
    })
  }

  @Get('Genre')
  getByGenre(@Param('Genre') genre: string) {
    return this.db.genres.findMany({
      where: { genrename: genre },
      include: {
        books: true,
      },
    });
  }
  @Get('Author')
  getByAuthor(@Param('Author') author: string) {
    return this.db.books.findMany({
      where: {writer:author}
    })
  }
  

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
