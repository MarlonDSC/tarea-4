import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schemas/book.schema';
import { Author, AuthorSchema } from './schemas/author.schema';
import { AuthorRepositoryImpl } from '../../adapters/repositories/author.repository';
import { BookRepositoryImpl } from '../../adapters/repositories/book.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
  ],
  providers: [
    {
      provide: 'AuthorRepository',
      useClass: AuthorRepositoryImpl,
    },
    {
      provide: 'BookRepository',
      useClass: BookRepositoryImpl,
    },
  ],
  exports: ['AuthorRepository', 'BookRepository'],
})
export class DatabaseModule {}
