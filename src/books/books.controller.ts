import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
  Request,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma.service';
import { SetBookStatusDto } from './dto/setbookstatus.dto';
import { User } from '@prisma/client';
import { contains } from 'class-validator';
import { writer } from 'repl';

@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly db: PrismaService,
  ) {}

  @Post(':Bookname')
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get('searchName/:Name')
  searchByBookName(@Param('Name') name: string) {
    return this.db.books.findMany({
      where: { bookname: name },
    });
  }

  @Get('searchGenre/:Genre')
  getByGenre(@Param('Genre') genre: string) {
    return this.db.genres.findMany({
      where: { genrename: genre },
      include: {
        books: true,
      },
    });
  }
  @Get(':Author')
  getByAuthor(@Param('Author') author: string) {
    return this.db.books.findMany({
      where: { writer: {
        contains: author
      } },
    });
  }
  

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }

  @Put(':id/status')
  library(@Param('id')id: string, @Body() setbookstatusdto:SetBookStatusDto, @Request() req ){
    
    const user: User =req.user; 
    this.db.userBook.upsert({
      where: {
        userid_bookid: {
          userid: user.id,
          bookid: parseInt(id)
        }
      },
      create: {
        userid: user.id,
        bookid: parseInt(id),
        score: setbookstatusdto.score,
        statusid: setbookstatusdto.status
      },
      update: {
        statusid: setbookstatusdto.status,
        score: setbookstatusdto.score
      }
    })
  }

  @Get('SearchUserBook/:id')
  searchUserBook(@Param('id')id: string){
    return this.db.userBook.findMany({
      where:{
        userid: parseInt(id)
      }
    })
  }
}
