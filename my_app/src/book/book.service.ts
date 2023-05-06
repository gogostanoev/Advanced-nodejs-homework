import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { Repository } from 'typeorm';
import { AuthorEntity } from 'src/author/entities/author.entity';
import { PublisherEntity } from 'src/publisher/entities/publisher.entity';
import { BookDto, UpdateBookDto } from './dto/book.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(BookEntity)
        private readonly bookRepository: Repository<BookEntity>,

        @InjectRepository(AuthorEntity)
        private readonly authorRepository: Repository<AuthorEntity>,

        @InjectRepository(PublisherEntity)
        private readonly publisherRepository: Repository<PublisherEntity>
    ) {}


    async getBooks(): Promise<BookEntity[]> {
        return await this.bookRepository.find({ relations: ['author', 'publisher'] });
    };

    
    async getBookId(ID: string): Promise<BookEntity> {
        const bookId = await this.bookRepository.findOneBy({ id: ID });

        if (!bookId) {
            throw new NotFoundException(`Book with id ${ID} not found.`);
        };

        return bookId;
    };

     
    async createBook(bookDto: BookDto): Promise<string> {
        const author = await this.authorRepository.findOneBy({ id: bookDto.author });
        const publisher = await this.authorRepository.findOneBy({ id: bookDto.publisher });

        if (!author && !publisher) {
            throw new BadRequestException(`Please provide all the neccessary IDs`);
        };

        const book = this.bookRepository.create({
            id: uuid(),
            ...bookDto,
            author: author,
            publisher: publisher
        });

        await this.bookRepository.save(book);

        return `The desired book has been successfully created ${book.id}`
    }


    async updateBook(bookDto: UpdateBookDto, ID: string) {
        const book = await this.bookRepository.preload({
            id: ID,
            ...bookDto
        });

        if (!book) {
            throw new BadRequestException(`Book with id ${ID} not found.`);
        };

        await this.bookRepository.save(book);

        return `The desired book has been successfully updated ${ID}`;
    };


    async deleteBook(ID: string) {
        if (!(await this.bookRepository.findOne({
            where: { id: ID },
            relations: ['author', 'publisher']
        }))) throw new BadRequestException(`Book with id ${ID} not found.`);

        await this.bookRepository.delete(ID);
        return `The desired book has been successfully deleted ${ID}`
    }
}
