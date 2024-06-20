const Country = require('../models/country.model');
const HTTPSTATUSCODE = require('../../utils/httpStatusCode');

const getCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: countries,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCountry = async (req, res) => {
  try {
    const id = req.params.id;
    const country = await Country.findById(id);
    if (!country) {
      return res.status(404).json({ message: `No se ha encontrado ${id}` });
    }
    res.status(200).json(country);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const createCountry = async (req, res) => {
  try {
    const country = new Country(req.body);
    await country.save();
    res.status(201).json({
      message: 'El país fue creado con éxito',
      country: country,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateCountry = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const country = await Country.findByIdAndUpdate(id, body, { new: true });
    if (!country) {
      return res.status(404).json({
        status: 404,
        message: HTTPSTATUSCODE[404],
      });
    }
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: country,
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: error.message });
  }
};

const deleteCountry = async (req, res) => {
  try {
    const id = req.params.id;
    const country = await Country.findByIdAndDelete(id);
    if (!country) {
      return res.status(404).json({ message: `No se ha encontrado ${id}` });
    }
    res.status(200).json({ message: 'Se borró el país' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCountries,
  getCountry,
  createCountry,
  updateCountry,
  deleteCountry,
};
