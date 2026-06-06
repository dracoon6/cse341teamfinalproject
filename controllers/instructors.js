const Instructor = require('../models/Instructor');
const mongoose = require('mongoose');

const getAll = async (req, res) => {
  try {
    const lists = await Instructor.find();
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid instructor id to find an instructor.' });
    }
    const result = await Instructor.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Instructor not found' });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createInstructor = async (req, res) => {
  try {
    if (!req.body.firstName || !req.body.lastName || !req.body.email) {
      return res.status(400).send({ message: 'First name, last name, and email are required!' });
    }

    const instructor = new Instructor({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      officeLocation: req.body.officeLocation,
      highestDegree: req.body.highestDegree
    });

    const response = await instructor.save();
    if (response) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the instructor.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateInstructor = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid instructor id to update an instructor.' });
    }
    const instructor = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      officeLocation: req.body.officeLocation,
      highestDegree: req.body.highestDegree
    };
    const response = await Instructor.findByIdAndUpdate(req.params.id, instructor, { new: true });
    if (response) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Instructor not found to update.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteInstructor = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid instructor id to delete an instructor.' });
    }
    const response = await Instructor.findByIdAndDelete(req.params.id);
    if (response) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Instructor not found to delete.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createInstructor,
  updateInstructor,
  deleteInstructor
};