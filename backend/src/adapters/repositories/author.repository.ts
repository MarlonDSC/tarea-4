import { Injectable, Inject } from '@nestjs/common';
import { AuthorRepository } from '../../domain/repositories/author.repository.interface';
import { Author } from '../../domain/models/author.model';
import { Connection } from 'mysql2/promise';
import { ResultSetHeader } from 'mysql2';

@Injectable()
export class AuthorRepositoryImpl implements AuthorRepository {
  constructor(@Inject('MYSQL_CONNECTION') private connection: Connection) {}

  private toDomain(row: any): Author {
    return new Author(row.id, row.name, row.bio);
  }

  async create(author: Author): Promise<Author> {
    const [result] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO authors (name, bio) VALUES (?, ?)',
      [author.name, author.bio]
    );
    author.id = result.insertId;
    return author;
  }

  async findAll(): Promise<Author[]> {
    const [rows] = await this.connection.execute('SELECT * FROM authors');
    return (rows as any[]).map(this.toDomain);
  }

  async findOne(id: string): Promise<Author> {
    const [rows] = await this.connection.execute('SELECT * FROM authors WHERE id = ?', [id]);
    return (rows as any[]).length ? this.toDomain(rows[0]) : null;
  }

  async update(id: string, author: Author): Promise<Author> {
    await this.connection.execute(
      'UPDATE authors SET name = ?, bio = ? WHERE id = ?',
      [author.name, author.bio, id]
    );
    return author;
  }

  async delete(id: string): Promise<Author> {
    const [rows] = await this.connection.execute('DELETE FROM authors WHERE id = ?', [id]);
    return (rows as any[]).length ? this.toDomain(rows[0]) : null;
  }
}
