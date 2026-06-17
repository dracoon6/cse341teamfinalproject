const User = require("../db/user");
const mongoose = require("mongoose");

const getAll = async (req, res) => {
  try {
    const lists = await User.find();
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
        .json({ message: "Must use a valid user id to find a user." });
    }
    const result = await User.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    if (!req.body.githubId || !req.body.username) {
      return res
        .status(400)
        .send({ message: "GitHub ID and username are required!" });
    }

    const user = new User({
      githubId: req.body.githubId,
      username: req.body.username,
      email: req.body.email,
      displayName: req.body.displayName,
      role: req.body.role || "Viewer",
    });

    const response = await user.save();
    if (response) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(response.error || "Some error occurred while creating the user.");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({ message: "Must use a valid user id to update a user." });
    }

    const user = {
      githubId: req.body.githubId,
      username: req.body.username,
      email: req.body.email,
      displayName: req.body.displayName,
      role: req.body.role,
    };
    const response = await User.findByIdAndUpdate(req.params.id, user, {
      new: true,
    });
    if (response) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "User not found to update." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({ message: "Must use a valid user id to delete a user." });
    }

    const response = await User.findByIdAndDelete(req.params.id);
    if (response) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "User not found to delete." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle, createUser, updateUser, deleteUser };
