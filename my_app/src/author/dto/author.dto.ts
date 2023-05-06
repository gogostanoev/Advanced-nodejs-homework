import { IsNotEmpty } from "class-validator";
import { Book } from "src/interfaces/book.interface";

export class AuthorDto {
    id: string;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    birthDate: Date;
}


export class UpdateAuthorDto {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    birthDate: Date;
}