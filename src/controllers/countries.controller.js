const HTTPSTATUSCODE = require('../../utils/httpStatusCode');
const Country = require('../models/country.model');

const getCountries = async (req, res) => {
  try {
    const countries = await Country.aggregate([
      { $project: { _id: 0, name: 1, fact: { $arrayElemAt: ['$facts', { $floor: { $rand: {} } }] } } }
    ]).exec();

    res.status(200).json({ data: countries });
  } catch (error) {
    console.error('Error in getCountries:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getCountry = async (req, res) => {
  try {
    const id = req.params.id;
    const country = await Country.findById(id).lean().exec;
    if (!country) {
      return res.status(404).json({ message: `Country with id ${id} not found` });
    }
    res.status(200).json(country);
  } catch (error) {
    console.error('Error in getCountry:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createCountry = async (req, res) => {
  try {
    const country = new Country(req.body);
    await country.save();
    res.status(201).json({ message: 'Country created successfully', country });
  } catch (error) {
    console.error('Error in createCountry:', error);
    res.status(400).json({ message: error.message });
  }
};

const updateCountry = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const country = await Country.findByIdAndUpdate(id, body, { new: true });
    if (!country) {
      return res.status(404).json({ message: `Country with id ${id} not found` });
    }
    res.status(200).json({ data: country });
  } catch (error) {
    console.error('Error in updateCountry:', error);
    res.status(400).json({ message: error.message });
  }
};

const deleteCountry = async (req, res) => {
  try {
    const id = req.params.id;
    const country = await Country.findByIdAndDelete(id);
    if (!country) {
      return res.status(404).json({ message: `Country with id ${id} not found` });
    }
    res.status(200).json({ message: 'Country deleted' });
  } catch (error) {
    console.error('Error in deleteCountry:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getCountries,
  getCountry,
  createCountry,
  updateCountry,
  deleteCountry,
};
