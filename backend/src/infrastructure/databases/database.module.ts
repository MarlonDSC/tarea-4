import { Module } from '@nestjs/common';
import { createConnection } from 'mysql2/promise';

const databaseProvider = {
  provide: 'MYSQL_CONNECTION',
  useFactory: async () => {
    return await createConnection({
      host: process.env.MYSQL_HOST || 'localhost',
      port: parseInt(process.env.MYSQL_PORT, 10) || 3307,  // Use port 3307
      user: process.env.MYSQL_USER || 'marlon',
      password: process.env.MYSQL_PASSWORD || 'marlon1234',
      database: process.env.MYSQL_DB || 'marlon',
    });
  },
};

@Module({
  providers: [databaseProvider],
  exports: [databaseProvider],
})
export class DatabaseModule {}
