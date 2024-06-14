const express = require('express');
const cors = require('cors');
const app = express();



const countriesRouter = express.Router()
const{getCountries,
    getCountry,
    createCountry,
    updateCountry,
    deleteCountry,} = require('../controllers/countries.controller');

countriesRouter.get ('/countries', getCountries);
countriesRouter.get ('/:id', getCountry);
countriesRouter.post ('/', createCountry);
countriesRouter.patch ('/:id',updateCountry);
countriesRouter.delete ('/:id', deleteCountry);



module.exports = countriesRouter;


