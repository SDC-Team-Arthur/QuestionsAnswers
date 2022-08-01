const postgresql = require('pg');

const pool = new postgresql.Pool({
  user: 'peterphan',
  database: 'questionsandanswers',
  password: '',
  host: '127.0.0.1',
  port: 5432
});

module.exports = {pool};