import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from '../book.service';
import { BookRepository } from '../../../domain/repositories/book.repository.interface';
import { Book } from '../../../domain/models/book.model';

describe('BookService', () => {
  let service: BookService;
  let bookRepository: Partial<BookRepository>;
  const mockDate = new Date('2024-06-24T22:13:07.432Z');

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(mockDate);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(async () => {
    bookRepository = {
      create: jest.fn().mockResolvedValue(new Book(1, 'Book 1', '1', mockDate)),
      findOne: jest.fn().mockResolvedValue(new Book(1, 'Book 1', '1', mockDate)),
      findAll: jest.fn().mockResolvedValue([
        new Book(1, 'Book 1', '1', mockDate),
        new Book(2, 'Book 2', '2', mockDate),
      ]),
      update: jest.fn().mockResolvedValue(new Book(1, 'Updated Book', '1', mockDate)),
      delete: jest.fn().mockResolvedValue(new Book(1, 'Book 1', '1', mockDate)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        { provide: 'BookRepository', useValue: bookRepository },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a book', async () => {
    const book = new Book(null, 'Book 1', '1', mockDate);
    const result = await service.create(book);
    expect(result).toEqual(new Book(1, 'Book 1', '1', mockDate));
    expect(bookRepository.create).toHaveBeenCalledWith(book);
  });

  it('should return a book by id', async () => {
    const result = await service.findOne('1');
    expect(result).toEqual(new Book(1, 'Book 1', '1', mockDate));
    expect(bookRepository.findOne).toHaveBeenCalledWith('1');
  });

  it('should return all books', async () => {
    const result = await service.findAll();
    expect(result).toEqual([
      new Book(1, 'Book 1', '1', mockDate),
      new Book(2, 'Book 2', '2', mockDate),
    ]);
    expect(bookRepository.findAll).toHaveBeenCalled();
  });

  it('should update a book', async () => {
    const book = new Book(1, 'Updated Book', '1', mockDate);
    const result = await service.update('1', book);
    expect(result).toEqual(book);
    expect(bookRepository.update).toHaveBeenCalledWith('1', book);
  });

  it('should delete a book', async () => {
    const result = await service.delete('1');
    expect(result).toEqual(new Book(1, 'Book 1', '1', mockDate));
    expect(bookRepository.delete).toHaveBeenCalledWith('1');
  });
});