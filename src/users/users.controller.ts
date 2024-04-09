import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  ForbiddenException,
  Query,
  Search,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { loginuserdto } from './dto/login.dto';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { query } from 'express';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiParam, ApiTags } from '@nestjs/swagger';



@ApiTags('Api of the users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiParam({
    name: 'Token',
    description:'The token of a user',
  })
  @ApiCreatedResponse({
    description: 'Successfully find yourself'
  })
  @ApiBadRequestResponse({
    description:'An error occured'
  })
  @Get('me')
  @UseGuards(AuthGuard('bearer'))
  me(@Request() req) {
    const user: User = req.user;
    return {
      email: user.email,
    };
  }
  /**
   * Creates a new user
   * 
   * @param CreateUserDto 
   * @returns 
   */
  @Post('Register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiParam({
    name: 'Name',
    description:'The Name of a user',
  })
  @ApiCreatedResponse({
    description: 'Successfully find the user'
  })
  @ApiBadRequestResponse({
    description:'An error occured'
  })
  @Get(':name')
  searchUsersByUsername(@Param('name') name: string){
    return this.usersService.searchByName;(name);
  }



  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  

}
