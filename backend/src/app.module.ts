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
import { BffModule } from './bff/bff.module';

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
      username: process.env.MYSQL_USER,
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
  ],
  controllers: [AuthorController, BookController],
  providers: [AuthorService, BookService, MySQLProvider],
})
export class AppModule {}
