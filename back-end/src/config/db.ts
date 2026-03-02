import sql from 'mssql';
import 'dotenv/config';

export const dbConfig = {
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  server: process.env.DB_SERVER as string,
  database: process.env.DB_NAME as string,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

export const getConnection = () => sql.connect(dbConfig);