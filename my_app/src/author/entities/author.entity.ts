import { BookEntity } from "src/book/entities/book.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity('authors')
export class AuthorEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    birthDate: Date;
    
    @OneToMany(() => BookEntity, (book) => book.author)
    books: BookEntity
}