import { Module } from '@nestjs/common';
import { BffService } from '../application/services/bff.service';
import { BffController } from '../adapters/controllers/bff.controller';
import { AuthorRepositoryImpl } from '../adapters/repositories/author.repository';
import { BookRepositoryImpl } from '../adapters/repositories/book.repository';

@Module({
  providers: [BffService, AuthorRepositoryImpl, BookRepositoryImpl],
  controllers: [BffController],
})
export class BffModule {}