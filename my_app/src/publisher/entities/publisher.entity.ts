import { BookEntity } from "src/book/entities/book.entity";
import { Book } from "src/interfaces/book.interface";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity('publisher') 
export class PublisherEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    phoneNumber: string;

    @OneToMany(() => BookEntity, (book) => book.publisher)
    books: BookEntity
}