const express = require('express');

const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
})
pool.query('SELECT * from usuarios', (err, res) => {
  console.log(err, res)
  pool.end()
})

const app = express();

app.get('/', (req, res) => {
    res.send('teste');
});

app.listen(3001);