import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { BookService } from '../../application/services/book.service';
import { Book } from '../../domain/models/book.model';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() book: Book) {
    return this.bookService.create(book);
  }

  @Get()
  async findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() book: Book) {
    return this.bookService.update(id, book);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.bookService.delete(id);
  }
}
