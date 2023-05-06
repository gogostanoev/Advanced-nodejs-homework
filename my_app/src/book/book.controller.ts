import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { IdRouteParams } from 'src/interfaces/route.params';
import { BookDto, UpdateBookDto } from './dto/book.dto';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Get()
    getBooks() {
        const books = this.bookService.getBooks();

        return books;
    };


    @Get(':id')
    getBookId(@Param() params: IdRouteParams) {
        const ID = params.id;

        return this.bookService.getBookId(ID);
    };


    @Post()
    async createAuthor(@Body() body: BookDto) {

        return await this.bookService.createBook(body);
    };


    @Put(':id')
    updateBook(@Body() body: UpdateBookDto, @Param() params: IdRouteParams) {
        const ID = params.id;

        return this.bookService.updateBook(body, ID);
    };


    @Delete('id')
    async deleteBook(@Param() params: IdRouteParams) {
        const ID = params.id

        return this.bookService.deleteBook(ID);
    }
}
