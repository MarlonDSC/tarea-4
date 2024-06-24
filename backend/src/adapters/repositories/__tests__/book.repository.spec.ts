import { Test, TestingModule } from '@nestjs/testing';
import { BookRepositoryImpl } from '../book.repository';
import { Book } from '../../../domain/models/book.model';
import { Connection } from 'mysql2/promise';

describe('BookRepositoryImpl', () => {
  let repository: BookRepositoryImpl;
  let connection: Partial<Connection>;

  beforeEach(async () => {
    connection = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookRepositoryImpl,
        { provide: 'MYSQL_CONNECTION', useValue: connection },
      ],
    }).compile();

    repository = module.get<BookRepositoryImpl>(BookRepositoryImpl);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should create a book', async () => {
    const book = new Book(null, 'Book Title', '1', new Date());
    (connection.execute as jest.Mock).mockResolvedValue([{ insertId: 1 }]);

    const result = await repository.create(book);
    expect(result.id).toBe(1);
    expect(connection.execute).toHaveBeenCalledWith(
      'INSERT INTO books (title, authorId, publishedDate) VALUES (?, ?, ?)',
      ['Book Title', '1', book.publishedDate]
    );
  });

  it('should find all books', async () => {
    const rows = [{ id: 1, title: 'Book Title', authorId: '1', publishedDate: new Date() }];
    (connection.execute as jest.Mock).mockResolvedValue([rows]);

    const result = await repository.findAll();
    expect(result).toEqual([new Book(1, 'Book Title', '1', rows[0].publishedDate)]);
    expect(connection.execute).toHaveBeenCalledWith('SELECT * FROM books');
  });

  it('should find one book by id', async () => {
    const rows = [{ id: 1, title: 'Book Title', authorId: '1', publishedDate: new Date() }];
    (connection.execute as jest.Mock).mockResolvedValue([rows]);

    const result = await repository.findOne('1');
    expect(result).toEqual(new Book(1, 'Book Title', '1', rows[0].publishedDate));
    expect(connection.execute).toHaveBeenCalledWith('SELECT * FROM books WHERE id = ?', ['1']);
  });

  it('should update a book', async () => {
    const book = new Book(1, 'Updated Title', '1', new Date());
    (connection.execute as jest.Mock).mockResolvedValue([{}]);

    const result = await repository.update('1', book);
    expect(result).toEqual(book);
    expect(connection.execute).toHaveBeenCalledWith(
      'UPDATE books SET title = ?, authorId = ?, publishedDate = ? WHERE id = ?',
      ['Updated Title', '1', book.publishedDate, '1']
    );
  });

  it('should delete a book', async () => {
    const rows = [{ id: 1, title: 'Book Title', authorId: '1', publishedDate: new Date() }];
    (connection.execute as jest.Mock).mockResolvedValue([rows]);

    const result = await repository.delete('1');
    expect(result).toEqual(new Book(1, 'Book Title', '1', rows[0].publishedDate));
    expect(connection.execute).toHaveBeenCalledWith('DELETE FROM books WHERE id = ?', ['1']);
  });
});