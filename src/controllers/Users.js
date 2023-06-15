const User = require("../models/User");
const Article = require("../models/Article");
const Category = require("../models/Category");

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).json({ message: "INTERNAL_SERVER_ERROR" });
  }
};

// Get user by id
const getUsersById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const articles = await Article.find({ createdBy: id });
    res.send({ user, articles });
  } catch (error) {
    res.status(500).json({ message: "INTERNAL_SERVER_ERROR" });
  }
};

//Create user

const createUsers = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;

    const users = new User({
      firstName,
      lastName,
    });

    if (!firstName || !lastName) {
      res.status(400).json({ message: "User info must be filled!" });
    }

    const saveUser = await users.save();
    return res.send(saveUser);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "INTERNAL_SERVER_ERROR" });
  }
};



//Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    let user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.send(user);
  } catch (error) {
    res.status(404).json({ message: "User not found!" });
  }
};






module.exports = {
  getUsers,
  createUsers,
  getUsersById,
  deleteUser
};
