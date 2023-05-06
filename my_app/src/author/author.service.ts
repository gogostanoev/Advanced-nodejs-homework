import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AuthorEntity } from './entities/author.entity';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { AuthorDto, UpdateAuthorDto } from './dto/author.dto';
import { Author } from 'src/interfaces/author.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthorService {
    constructor(
        @InjectRepository(AuthorEntity)
        private readonly authorRepository: Repository<AuthorEntity>
    ) {}

    async getAuthors() {
        return await this.authorRepository.find({ relations: ['books'] });
    };

    async getAuthorId(ID: string) {
        const authorId = await this.authorRepository.findOne({
            where: { id: ID },
            relations: ['books']
        });

        if (!authorId) {
            throw new NotFoundException(`Author with id ${ID} not found.`);
        };

        return authorId;
    };

    async createAuthor(authorDto: AuthorDto) {
        const author: AuthorDto = {
            id: uuid(),
            ...authorDto
        };

        const authorCreated = this.authorRepository.create(author);

        const authorSaved = await this.authorRepository.save(authorCreated);
        console.log(authorSaved);

        return `The author info has been successfully created ${author.id}`;
    };

    async updateAuthor(authorDto: UpdateAuthorDto, ID: string) {
        const updatedAuthor: AuthorDto = {
            id: ID,
            ...authorDto
        };

        const author = await this.authorRepository.preload({
            id: ID,
            ...updatedAuthor
        });

        if (!author) {
            throw new BadRequestException(`Author with id ${ID} not found.`);
        };

        await this.authorRepository.save(author);
        return `The author's information has been successfully updated ${ID}`;
    };

    async deleteAuthor(ID: string) {
        if(!(await this.authorRepository.findOne({
            where: { id :ID },
        }))) throw new BadRequestException(`Author with id ${ID} not found.`);

        await this.authorRepository.delete(ID);
        return `The desired author information has been deleted ${ID}`
    }
}
