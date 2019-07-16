
const express = require('express');

const db = require('./data/dbConfig');


const server = express();

server.use(express.json());


server.get('/', async (req, res, next) => {
  try {
    res.json('Welcome to my shop');
  } catch (error) {
    next(new Error('error'));
  }
});



server.use((err, req, res, next) => {
  console.error('ERROR:', err);
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
});


module.exports = server;