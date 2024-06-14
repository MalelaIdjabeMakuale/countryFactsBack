const { response } = require("express");
const Country = require("../models/country.model.js");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode.js");

const getCountries= async (request, response) => {
  try {
    const countries = await Country.find();
    response.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: countries
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const getCountry = async (request, response) => {
  try {
    const id = request.params.id;
    const country = await Country.findById(id);
    if (!country) {
      return response.status(404).json({ message: `No se ha encontrado ${id}` });
    }
    response.status(200).json(country);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ message: error.message });
  }
};

const createCountry = async (request, response) => {
  try {
    const country = new Country(request.body);
    await country.save();
    response.status(201).json({
      message: "El país fue creado con éxito",
      country: country
    });
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};

const updateCountry = async (request, response) => {
  try {
    const id = request.params.id;
    const body = request.body;
    const country = await Country.findByIdAndUpdate(id, body, { new: true });
    if (!country) {
      return response.status(404).json({
        status: 404,
        message: HTTPSTATUSCODE[404]
      });
    }
    response.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: country
    });
  } catch (error) {
    console.error(error.message);
    response.status(400).json({ message: error.message });
  }
};

const deleteCountry = async (request, response) => {
  try {
    const id = request.params.id;
    const country = await Country.findByIdAndDelete(id);
    if (!country) {
      return response.status(404).json({ message: `No se ha encontrado ${id}` });
    }
    response.status(200).json({ message: "Se borró el país" });
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCountries,
  getCountry,
  createCountry,
  updateCountry,
  deleteCountry,
};
