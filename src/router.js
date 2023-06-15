const express = require("express");
const app = express();
const router = express.Router();
const {
  getUsers,
  createUsers,
  getUsersById,
  deleteUser,
} = require("./controllers/Users");

const {
  createArticle,
  getArticle,
  deleteArticle,
  getArticles,
  deleteUserArticles,
} = require("./controllers/Article");

const {
  getCategory,
  getCategoryById,
  createCategory,
  deleteCategory,
} = require("./controllers/Category");

//Create User
router.post("/users", createUsers);

// List of users
router.get("/users", getUsers);

//user by id
router.get("/users/:id", getUsersById);

//delete user
router.delete("/users/:id", deleteUser);

//Article create
router.post("/articles", createArticle);

//get Articles
router.get("/articles", getArticles);

//get Article by ID
router.get("/articles/:id", getArticle);

//delete article
router.delete("/articles/:id", deleteArticle);

//delete user articles 
router.delete("/articles/authors/:id", deleteUserArticles);

//Category create
router.post("/categories", createCategory);

//get Category
router.get("/categories", getCategory);

//get Category
router.get("/categories/:id", getCategoryById);

//delete category
router.delete("/categories/:id", deleteCategory);

module.exports = router;
