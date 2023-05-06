import { IsNotEmpty } from "class-validator";

export class BookDto {
    id: string;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    genre: string;

    @IsNotEmpty()
    author: string;

    @IsNotEmpty()
    publisher: string;
}


export class UpdateBookDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    genre: string;
}