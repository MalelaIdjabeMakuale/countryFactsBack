const express = require('express');
const {
  getCountries,
  getCountry,
  createCountry,
  updateCountry,
  deleteCountry,
} = require('../controllers/countries.controller');

const countriesRouter = express.Router();

countriesRouter.get('/countries', getCountries);
countriesRouter.get('/:id', getCountry);
countriesRouter.post('/', createCountry);
countriesRouter.patch('/:id', updateCountry);
countriesRouter.delete('/:id', deleteCountry);

module.exports = countriesRouter;
