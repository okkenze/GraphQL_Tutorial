
import  sql from 'mssql/msnodesqlv8.js';

import { config } from './_dbConfig.js';

async function getConnection() {
  try {
    const pool = await sql.connect(config);
    console.log('Connected to SQL Server with Windows Authentication');
    return pool;
  } catch (err) {
    console.error('Database connection failed:', err);
    throw err;
  }
}

export default { getConnection }
