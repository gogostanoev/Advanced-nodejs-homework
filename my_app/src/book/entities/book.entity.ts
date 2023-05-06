import { AuthorEntity } from "src/author/entities/author.entity";
import { Author } from "src/interfaces/author.interface";
import { Publisher } from "src/interfaces/publisher.interface";
import { PublisherEntity } from "src/publisher/entities/publisher.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";

@Entity('book')
export class BookEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    genre: string;

    @ManyToOne(() => AuthorEntity, (author) => author.books)
    author: AuthorEntity

    @OneToOne(() => PublisherEntity, (publisher) => publisher.books)
    publisher: PublisherEntity
}