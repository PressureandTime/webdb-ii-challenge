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

function getAllCars() {
  return db('cars');
}

function findCarById(id) {
  return db('cars').where({ id });
}

function addCar({ VIN, make, model, mileage }) {
  return db('cars').insert({ VIN, make, model, mileage });
}

server.get('/cars', async (req, res) => {
  const cars = await getAllCars();
  res.json(cars);
});

server.post('/cars', async (req, res, next) => {
  try {
    const arrayOfCars = await addCar(req.body);
    const arrayOfIds = await findCarById(arrayOfCars[0]);
    res.status(201).json(arrayOfIds[0]);
  } catch (error) {
    next(new Error("Couldn't create car"));
  }
});

server.use((err, req, res, next) => {
  console.error('ERROR:', err);
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
  next();
});

module.exports = server;
