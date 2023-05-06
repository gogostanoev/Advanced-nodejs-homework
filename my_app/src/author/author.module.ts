import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from './entities/author.entity';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { BookService } from 'src/book/book.service';
import { PublisherService } from 'src/publisher/publisher.service';
import { BookController } from 'src/book/book.controller';
import { PublisherController } from 'src/publisher/publisher.controller';
import { BookEntity } from 'src/book/entities/book.entity';
import { PublisherEntity } from 'src/publisher/entities/publisher.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AuthorEntity, BookEntity, PublisherEntity])],
    providers: [AuthorService, BookService, PublisherService],
    controllers: [AuthorController, BookController, PublisherController]
})
export class AuthorModule {}
