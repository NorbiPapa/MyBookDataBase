import { IsDateString, IsNotEmpty, Min } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  release: number;

  @IsNotEmpty()
  writer: string;

  @IsNotEmpty()
  bookname: string;

  @IsNotEmpty()
  genre: string;
}
