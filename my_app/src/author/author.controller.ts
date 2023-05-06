import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AuthorService } from './author.service';
import { IdRouteParams } from 'src/interfaces/route.params';
import { AuthorDto, UpdateAuthorDto } from './dto/author.dto';

@Controller('author')
export class AuthorController {
    constructor(private readonly authorService: AuthorService) {}

    @Get()
    getAuthors() {
        const authors = this.authorService.getAuthors();

        return authors;
    };


    @Get(':id')
    getAuthorId(@Param() params: IdRouteParams) {
        const ID = params.id;

        return this.authorService.getAuthorId(ID);
    }


    @Post()
    async createAuthor(@Body() body: AuthorDto) {

        return await this.authorService.createAuthor(body)
    }

    
    @Put(':id')
    updateAuthor(@Body() body: UpdateAuthorDto, @Param() params: IdRouteParams) {
        const ID = params.id;

        return this.authorService.updateAuthor(body, ID);
    };


    @Delete('id')
    async deleteAuthor(@Param() params: IdRouteParams) {
        const ID = params.id

        return this.authorService.deleteAuthor(ID);
    }
}
