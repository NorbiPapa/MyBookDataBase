import {IsDateString, IsNotEmpty, Min, } from 'class-validator';

export class CreateBookDto {
    @IsNotEmpty()
    @IsDateString()
    release: Date;

    @IsNotEmpty()
    @Min(5)
    writer: String;

    @IsNotEmpty()
    @Min(5)
    bookname: String;
}
