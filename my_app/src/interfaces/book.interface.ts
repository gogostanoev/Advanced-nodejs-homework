import { Author } from "./author.interface";
import { Publisher } from "./publisher.interface";

export interface Book {
    id: string,
    title: string,
    description: string,
    genre: string,
    author: Author,
    publisher: Publisher
}