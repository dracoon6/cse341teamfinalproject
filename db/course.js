const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseCode: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  credits: Number,
  departmentId: String,
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'instructor' },
  syllabusUrl: String
});

module.exports = mongoose.model('course', courseSchema);