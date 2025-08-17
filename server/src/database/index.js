const { Pool } = require("pg");
require("dotenv").config();

// Configure connection pool. Render's PostgreSQL requires SSL in production.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

// Expose a simple query helper used throughout the models.
module.exports = {
  query(text, params) {
    return pool.query(text, params);
  },
};
