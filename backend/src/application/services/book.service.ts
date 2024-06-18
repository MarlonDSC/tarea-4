import { Inject, Injectable } from '@nestjs/common';
import { BookRepository } from '../../domain/repositories/book.repository.interface';
import { Book } from '../../domain/models/book.model';

@Injectable()
export class BookService {
  constructor(
    @Inject('BookRepository') private readonly bookRepository: BookRepository
  ) {}

  create(book: Book): Promise<Book> {
    return this.bookRepository.create(book);
  }

  findAll(): Promise<Book[]> {
    return this.bookRepository.findAll();
  }

  findOne(id: string): Promise<Book> {
    return this.bookRepository.findOne(id);
  }

  update(id: string, book: Book): Promise<Book> {
    return this.bookRepository.update(id, book);
  }

  delete(id: string): Promise<Book> {
    return this.bookRepository.delete(id);
  }
}
