import mysql from 'mysql2/promise';

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost', // Change if using a remote DB
  user: 'root',
  password: 'nagavineela',
  database: 'hotels',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
