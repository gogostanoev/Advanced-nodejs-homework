import { Book } from "./book.interface";

export interface Publisher {
    id: string,
    name: string,
    address: string,
    phoneNumber: string,
    books: Book[]
}