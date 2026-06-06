const Course = require('../db/course');
const mongoose = require('mongoose');

const getAll = async (req, res) => {
  try {
    const lists = await Course.find();
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid course id to find a course.' });
    }
    const result = await Course.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createCourse = async (req, res) => {
  try {
    if (!req.body.courseCode || !req.body.title) {
      return res.status(400).send({ message: 'Course code and title are required!' });
    }

    const course = new Course({
      courseCode: req.body.courseCode,
      title: req.body.title,
      description: req.body.description,
      credits: req.body.credits,
      departmentId: req.body.departmentId,
      instructorId: req.body.instructorId,
      syllabusUrl: req.body.syllabusUrl
    });

    const response = await course.save();
    if (response) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the course.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid course id to update a course.' });
    }

    const course = {
      courseCode: req.body.courseCode,
      title: req.body.title,
      description: req.body.description,
      credits: req.body.credits,
      departmentId: req.body.departmentId,
      instructorId: req.body.instructorId,
      syllabusUrl: req.body.syllabusUrl
    };
    const response = await Course.findByIdAndUpdate(req.params.id, course, { new: true });
    if (response) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Course not found to update.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid course id to delete a course.' });
    }

    const response = await Course.findByIdAndDelete(req.params.id);
    if (response) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Course not found to delete.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle, createCourse, updateCourse, deleteCourse };
