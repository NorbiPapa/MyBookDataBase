import { IsString } from 'class-validator';

export class loginuserdto {
  @IsString()
  email: string;
  @IsString()
  password: string;
}
