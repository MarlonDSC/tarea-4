import { Author } from '../models/author.model';

export interface AuthorRepository {
  create(author: Author): Promise<Author>;
  findAll(): Promise<Author[]>;
  findOne(id: string): Promise<Author>;
  update(id: string, author: Author): Promise<Author>;
  delete(id: string): Promise<Author>;
}
