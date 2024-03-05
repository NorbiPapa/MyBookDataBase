import { IsDateString, IsNotEmpty, Min } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsDateString()
  release: string;

  @IsNotEmpty()
  @Min(5)
  writer: string;

  @IsNotEmpty()
  @Min(5)
  bookname: string;

  @IsNotEmpty()
  genre: string;
}
