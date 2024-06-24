import { Test, TestingModule } from '@nestjs/testing';
import { BffService } from '../bff.service';
import { AuthorRepository } from '../../../domain/repositories/author.repository.interface';
import { BookRepository } from '../../../domain/repositories/book.repository.interface';

describe('BffService', () => {
  let service: BffService;
  let authorRepository: Partial<AuthorRepository>;
  let bookRepository: Partial<BookRepository>;

  beforeEach(async () => {
    authorRepository = {
      findOne: jest.fn().mockResolvedValue({ id: '1', name: 'Author 1' }),
    };

    bookRepository = {
      findAll: jest.fn().mockResolvedValue([
        { id: '1', authorId: '1', title: 'Book 1' },
        { id: '2', authorId: '1', title: 'Book 2' },
        { id: '3', authorId: '2', title: 'Book 3' },
      ]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BffService,
        { provide: 'AuthorRepository', useValue: authorRepository },
        { provide: 'BookRepository', useValue: bookRepository },
      ],
    }).compile();

    service = module.get<BffService>(BffService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return author with books', async () => {
    const result = await service.getAuthorWithBooks('1');
    expect(result).toEqual({
      author: { id: '1', name: 'Author 1' },
      books: [
        { id: '1', authorId: '1', title: 'Book 1' },
        { id: '2', authorId: '1', title: 'Book 2' },
      ],
    });
  });
});