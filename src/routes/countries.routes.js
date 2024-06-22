const express = require('express');
const router = express.Router();
const {
  getCountries,
  getCountry,
  createCountry,
  updateCountry,
  deleteCountry,
} = require('../controllers/countries.controller');

router.get('/countries', getCountries);
router.get('/:id', getCountry);
router.post('/', createCountry);
router.patch('/:id', updateCountry);
router.delete('/:id', deleteCountry);

module.exports = router;
