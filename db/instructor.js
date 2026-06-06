const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  officeLocation: String,
  highestDegree: String
});

module.exports = mongoose.model('instructor', instructorSchema);