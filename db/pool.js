import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const db_config = {
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 300,
  idleTimeoutMillis: 200,
  max: 20,
};

const pool = new Pool(db_config);

pool.on('connect', () => {
  console.log('Database Connection Successfully');
});

pool.on('remove', () => {
  console.log('Database Connection Removed');
});

export { pool };
