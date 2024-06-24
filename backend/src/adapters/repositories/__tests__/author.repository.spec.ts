import { Test, TestingModule } from '@nestjs/testing';
import { AuthorRepositoryImpl } from '../author.repository';
import { Author } from '../../../domain/models/author.model';
import { Connection } from 'mysql2/promise';

describe('AuthorRepositoryImpl', () => {
  let repository: AuthorRepositoryImpl;
  let connection: Partial<Connection>;

  beforeEach(async () => {
    connection = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorRepositoryImpl,
        { provide: 'MYSQL_CONNECTION', useValue: connection },
      ],
    }).compile();

    repository = module.get<AuthorRepositoryImpl>(AuthorRepositoryImpl);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should create an author', async () => {
    const author = new Author(null, 'Author Name', 'Author Bio');
    (connection.execute as jest.Mock).mockResolvedValue([{ insertId: 1 }]);

    const result = await repository.create(author);
    expect(result.id).toBe(1);
    expect(connection.execute).toHaveBeenCalledWith(
      'INSERT INTO authors (name, bio) VALUES (?, ?)',
      ['Author Name', 'Author Bio']
    );
  });

  it('should find all authors', async () => {
    const rows = [{ id: 1, name: 'Author Name', bio: 'Author Bio' }];
    (connection.execute as jest.Mock).mockResolvedValue([rows]);

    const result = await repository.findAll();
    expect(result).toEqual([new Author(1, 'Author Name', 'Author Bio')]);
    expect(connection.execute).toHaveBeenCalledWith('SELECT * FROM authors');
  });

  it('should find one author by id', async () => {
    const rows = [{ id: 1, name: 'Author Name', bio: 'Author Bio' }];
    (connection.execute as jest.Mock).mockResolvedValue([rows]);

    const result = await repository.findOne('1');
    expect(result).toEqual(new Author(1, 'Author Name', 'Author Bio'));
    expect(connection.execute).toHaveBeenCalledWith('SELECT * FROM authors WHERE id = ?', ['1']);
  });

  it('should update an author', async () => {
    const author = new Author(1, 'Updated Name', 'Updated Bio');
    (connection.execute as jest.Mock).mockResolvedValue([{}]);

    const result = await repository.update('1', author);
    expect(result).toEqual(author);
    expect(connection.execute).toHaveBeenCalledWith(
      'UPDATE authors SET name = ?, bio = ? WHERE id = ?',
      ['Updated Name', 'Updated Bio', '1']
    );
  });

  it('should delete an author', async () => {
    const rows = [{ id: 1, name: 'Author Name', bio: 'Author Bio' }];
    (connection.execute as jest.Mock).mockResolvedValue([rows]);

    const result = await repository.delete('1');
    expect(result).toEqual(new Author(1, 'Author Name', 'Author Bio'));
    expect(connection.execute).toHaveBeenCalledWith('DELETE FROM authors WHERE id = ?', ['1']);
  });
});