import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthorController } from './adapters/controllers/author.controller';
import { BookController } from './adapters/controllers/book.controller';
import { AuthorService } from './application/services/author.service';
import { BookService } from './application/services/book.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import env from './infrastructure/databases/config/env';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './infrastructure/databases/config/jwt.config';
import { AuthModule } from './infrastructure/modules/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySQLProvider } from './providers/mysql.provider';
import { BffModule } from './infrastructure/modules/bff.module';
import { AuthService } from './application/services/auth.service';
import { BffService } from './application/services/bff.service';
import { UserService } from './application/services/user.service';
import { AuthController } from './adapters/controllers/auth.controller';
import { BffController } from './adapters/controllers/bff.controller';
import { DatabaseModule } from './infrastructure/databases/database.module';
import { AuthorRepositoryImpl } from './adapters/repositories/author.repository';
import { BookRepositoryImpl } from './adapters/repositories/book.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [env],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT, 10),
      username: 'root',
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'exchange1',
          type: 'topic',
        },
      ],
      uri: process.env.RABBITMQ_URI,
      connectionInitOptions: { wait: false },
    }),
    JwtModule.register(jwtConfig),
    AuthModule,
    BffModule,
    DatabaseModule, // Add DatabaseModule here
  ],
  controllers: [AuthController, BffController, AuthorController, BookController],
  providers: [
    AuthService,
    BffService,
    AuthorService,
    BookService,
    UserService,
    MySQLProvider,
    { provide: 'AuthorRepository', useClass: AuthorRepositoryImpl }, // Provide AuthorRepository
    { provide: 'BookRepository', useClass: BookRepositoryImpl }, // Provide BookRepository
  ],
})
export class AppModule {}
