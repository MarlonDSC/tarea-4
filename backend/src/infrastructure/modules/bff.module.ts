import { Module } from '@nestjs/common';
import { BffService } from '../../application/services/bff.service';
import { BffController } from '../../adapters/controllers/bff.controller';
import { AuthorRepositoryImpl } from '../../adapters/repositories/author.repository';
import { BookRepositoryImpl } from '../../adapters/repositories/book.repository';
import { DatabaseModule } from '../databases/database.module'; // Import the module providing MYSQL_CONNECTION

@Module({
  imports: [DatabaseModule],
  controllers: [BffController],
  providers: [
    BffService,
    { provide: 'AuthorRepository', useClass: AuthorRepositoryImpl },
    { provide: 'BookRepository', useClass: BookRepositoryImpl }
  ],
})
export class BffModule {}