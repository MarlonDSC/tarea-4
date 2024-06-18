import { Book } from '../models/book.model';

export interface BookRepository {
  create(book: Book): Promise<Book>;
  findAll(): Promise<Book[]>;
  findOne(id: string): Promise<Book>;
  update(id: string, book: Book): Promise<Book>;
  delete(id: string): Promise<Book>;
}
