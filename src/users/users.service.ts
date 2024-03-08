import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { loginuserdto } from './dto/login.dto';
import { PrismaService } from 'src/prisma.service';
import { PrismaClient } from '@prisma/client';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly db: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.db.user.create({
      data: {
        email: createUserDto.email,
        username: createUserDto.username,
        password: createUserDto.password,
        role: createUserDto.role,
      },
    });
  }
  findByEmail(email: string) {
    return this.db.user.findUnique({
      where: { email },
    });
  }
  searchByName(username: string) {
    return this.db.user.findFirst({
      where: {
        username: username
      },
    });
  }


  update(id: number, updateUserDto: UpdateUserDto) {
    return this.db.user.update({
      where: {
        id:id
      },
      data: {
        email: updateUserDto.email,
        username: updateUserDto.username,
        password: updateUserDto.password,
        role: updateUserDto.role,
      }
    });
  }

  remove(id: number) {
    return this.db.user.delete({
      where: {
        id:id
      }
    });
  }
  login(loginuserdto: loginuserdto) {
    return '';
  }
}
