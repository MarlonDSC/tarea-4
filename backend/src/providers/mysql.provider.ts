import { Provider } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

export const MySQLProvider: Provider = {
  provide: 'MYSQL_CONNECTION',
  useFactory: async () => {
    return await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
      port: parseInt(process.env.MYSQL_PORT, 10),
    });
  },
};