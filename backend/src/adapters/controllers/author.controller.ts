import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AuthorService } from '../../application/services/author.service';
import { Author } from '../../domain/models/author.model';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  async create(@Body() author: Author) {
    return this.authorService.create(author);
  }

  @Get()
  async findAll() {
    return this.authorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.authorService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() author: Author) {
    return this.authorService.update(id, author);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.authorService.delete(id);
  }
}
