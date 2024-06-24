import { Inject, Injectable } from '@nestjs/common';
import { BookRepository } from '../../domain/repositories/book.repository.interface';
import { Book } from '../../domain/models/book.model';
import { Connection } from 'mysql2/promise';
import { ResultSetHeader } from 'mysql2';

@Injectable()
export class BookRepositoryImpl implements BookRepository {
  constructor(@Inject('MYSQL_CONNECTION') private connection: Connection) {}

  private toDomain(row: any): Book {
    return new Book(row.id, row.title, row.authorId, row.publishedDate);
  }

  async create(book: Book): Promise<Book> {
    const [result] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO books (title, authorId, publishedDate) VALUES (?, ?, ?)',
      [book.title, book.authorId, book.publishedDate]
    );
    book.id = result.insertId;
    return book;
  }

  async findAll(): Promise<Book[]> {
    const [rows] = await this.connection.execute('SELECT * FROM books');
    return (rows as any[]).map(this.toDomain);
  }

  async findOne(id: string): Promise<Book> {
    const [rows] = await this.connection.execute('SELECT * FROM books WHERE id = ?', [id]);
    return (rows as any[]).length ? this.toDomain(rows[0]) : null;
  }

  async update(id: string, book: Book): Promise<Book> {
    await this.connection.execute(
      'UPDATE books SET title = ?, authorId = ?, publishedDate = ? WHERE id = ?',
      [book.title, book.authorId, book.publishedDate, id]
    );
    return book;
  }

  async delete(id: string): Promise<Book> {
    const [rows] = await this.connection.execute('DELETE FROM books WHERE id = ?', [id]);
    return (rows as any[]).length ? this.toDomain(rows[0]) : null;
  }
}
