const Department = require("../db/department");
const mongoose = require("mongoose");

const getAll = async (req, res) => {
  try {
    const lists = await Department.find();
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({
          message: "Must use a valid department id to find a department.",
        });
    }
    const result = await Department.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createDepartment = async (req, res) => {
  try {
    if (!req.body.name || !req.body.code) {
      return res.status(400).send({ message: "Name and Code are required!" });
    }

    const department = new Department({
      name: req.body.name,
      code: req.body.code,
      officePhone: req.body.officePhone,
      budgetCode: req.body.budgetCode,
    });

    const response = await department.save();
    if (response) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(
          response.error ||
            "Some error occurred while creating the department.",
        );
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateDepartment = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({
          message: "Must use a valid department id to update a department.",
        });
    }

    const department = {
      name: req.body.name,
      code: req.body.code,
      officePhone: req.body.officePhone,
      budgetCode: req.body.budgetCode,
    };
    const response = await Department.findByIdAndUpdate(
      req.params.id,
      department,
      { new: true },
    );
    if (response) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Department not found to update." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({
          message: "Must use a valid department id to delete a department.",
        });
    }

    const response = await Department.findByIdAndDelete(req.params.id);
    if (response) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Department not found to delete." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
