import { Test, TestingModule } from '@nestjs/testing';
import { AuthorService } from '../author.service';
import { AuthorRepository } from '../../../domain/repositories/author.repository.interface';
import { Author } from '../../../domain/models/author.model';

describe('AuthorService', () => {
  let service: AuthorService;
  let authorRepository: Partial<AuthorRepository>;

  beforeEach(async () => {
    authorRepository = {
      create: jest.fn().mockResolvedValue(new Author(1, 'Author 1', 'Bio 1')),
      findOne: jest.fn().mockResolvedValue(new Author(1, 'Author 1', 'Bio 1')),
      findAll: jest.fn().mockResolvedValue([new Author(1, 'Author 1', 'Bio 1')]),
      update: jest.fn().mockResolvedValue(new Author(1, 'Updated Author', 'Updated Bio')),
      delete: jest.fn().mockResolvedValue(new Author(1, 'Author 1', 'Bio 1')),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorService,
        { provide: 'AuthorRepository', useValue: authorRepository },
      ],
    }).compile();

    service = module.get<AuthorService>(AuthorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an author', async () => {
    const author = new Author(null, 'Author 1', 'Bio 1');
    const result = await service.create(author);
    expect(result).toEqual(new Author(1, 'Author 1', 'Bio 1'));
    expect(authorRepository.create).toHaveBeenCalledWith(author);
  });

  it('should return an author by id', async () => {
    const result = await service.findOne('1');
    expect(result).toEqual(new Author(1, 'Author 1', 'Bio 1'));
    expect(authorRepository.findOne).toHaveBeenCalledWith('1');
  });

  it('should return all authors', async () => {
    const result = await service.findAll();
    expect(result).toEqual([new Author(1, 'Author 1', 'Bio 1')]);
    expect(authorRepository.findAll).toHaveBeenCalled();
  });

  it('should update an author', async () => {
    const author = new Author(1, 'Updated Author', 'Updated Bio');
    const result = await service.update('1', author);
    expect(result).toEqual(author);
    expect(authorRepository.update).toHaveBeenCalledWith('1', author);
  });

  it('should delete an author', async () => {
    const result = await service.delete('1');
    expect(result).toEqual(new Author(1, 'Author 1', 'Bio 1'));
    expect(authorRepository.delete).toHaveBeenCalledWith('1');
  });
});