import { Injectable, Inject } from '@nestjs/common';
import { AuthorRepository } from '../../domain/repositories/author.repository.interface';
import { Author } from '../../domain/models/author.model';

@Injectable()
export class AuthorService {
  constructor(
    @Inject('AuthorRepository') private readonly authorRepository: AuthorRepository
  ) {}

  create(author: Author): Promise<Author> {
    return this.authorRepository.create(author);
  }

  findAll(): Promise<Author[]> {
    return this.authorRepository.findAll();
  }

  findOne(id: string): Promise<Author> {
    return this.authorRepository.findOne(id);
  }

  update(id: string, author: Author): Promise<Author> {
    return this.authorRepository.update(id, author);
  }

  delete(id: string): Promise<Author> {
    return this.authorRepository.delete(id);
  }
}
