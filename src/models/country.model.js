const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  facts: [{
    type: String,
    trim: true,
  }],
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;
