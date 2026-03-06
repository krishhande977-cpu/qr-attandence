const { Pool } = require('pg');

// Neon provides a PostgreSQL-compatible connection string
const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL || process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

module.exports = pool;