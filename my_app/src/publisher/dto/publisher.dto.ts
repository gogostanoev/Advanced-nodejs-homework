import { IsNotEmpty } from "class-validator";
import { Book } from "src/interfaces/book.interface";

export class PublisherDto {
    id: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    phoneNumber: string;

    @IsNotEmpty()
    books: Book[]
}