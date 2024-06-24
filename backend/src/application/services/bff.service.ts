import { Inject, Injectable } from '@nestjs/common';
import { AuthorRepository } from '../../domain/repositories/author.repository.interface';
import { BookRepository } from '../../domain/repositories/book.repository.interface';

@Injectable()
export class BffService {
  constructor(
    @Inject('AuthorRepository') private readonly authorRepository: AuthorRepository,
    @Inject('BookRepository') private readonly bookRepository: BookRepository
  ) {}

  async getAuthorWithBooks(authorId: string) {
    const author = await this.authorRepository.findOne(authorId);
    const books = await this.bookRepository.findAll();
    const authorBooks = books.filter(book => book.authorId === authorId);
    return { author, books: authorBooks };
  }
}