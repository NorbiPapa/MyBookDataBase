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
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma.service';
import { SetBookStatusDto } from './dto/setbookstatus.dto';
import { User } from '@prisma/client';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Book } from './entities/book.entity';
import { AuthGuard } from '@nestjs/passport';
import { tr } from '@faker-js/faker';

@ApiTags('Api of the books')
@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly db: PrismaService,
  ) {}

  /**
   * Creates a new user
   *
   * @param CreateBookDto
   * @returns
   */
  @Post(':Bookname')
  @ApiCreatedResponse({
    description: 'Succesful product creation',
    type: Book,
  })
  @ApiBadRequestResponse({
    description: 'An error occured',
  })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @ApiParam({
    name: 'Book Name',
    description: 'The name of the book',
    type: String,
  })
  @ApiOkResponse({
    description: 'Returns the details of the book',
    type: Book,
  })
  @ApiNotFoundResponse({
    description: 'There is no book with this name',
  })
  @Get('SearchName')
  SearchAll() {
    return this.booksService.SearchAll();
  }
  @Post('Author/:Author')
  getByAuthor(@Param('Author') author: string) {
    return this.booksService.getbyAuthor(author);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }

  @ApiParam({
    name: 'id',
    description: 'The ID of the User library',
  })
  @ApiOkResponse({
    description: 'Puts the book in the library',
    type: Book,
  })
  @Put(':id/status')
  @UseGuards(AuthGuard('bearer'))
  library(
    @Param('id') id: string,
    @Body() setbookstatusdto: SetBookStatusDto,
    @Request() req,
  ) {
    const user: User = req.user;
    return this.db.userBook.upsert({
      where: {
        userid_bookid: {
          userid: user.id,
          bookid: parseInt(id),
        },
      },
      create: {
        userid: user.id,
        bookid: parseInt(id),
        statusid: setbookstatusdto.status,
      },
      update: {
        statusid: setbookstatusdto.status,
      },
    });
  }

  @Get('SearchUserBook/')
  @UseGuards(AuthGuard('bearer'))
  searchUserBook(@Request() req) {
    const user: User = req.user;
    return this.db.userBook.findMany({
      where: {
        userid: user.id,
      },
      include: {
        status: true,
        book: true,
      },
    });
  }
}
