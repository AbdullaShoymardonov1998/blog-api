const User = require("../models/User");
const Article = require("../models/Article");
const Category = require("../models/Category");

//Create Article

const createArticle = async (req, res) => {
    try {
      const { title, body, createdBy, category } = req.body;
  
      const user = await User.findById(createdBy);
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
  
      const categoryCheck = await Category.findById(category);
      if (!categoryCheck) {
        return res.status(400).json({ message: "Category not found" });
      }
  
      const newArticle = new Article({
        title,
        body,
        createdBy,
        category,
      });
  
      const saveArticle = await newArticle.save();
      return res.send(saveArticle);
    } catch (error) {
      res.status(500).json({ message: "INTERNAL_SERVER_ERROR" });
    }
  };
  
  //get all articles
  const getArticles = async (req, res) => {
    try {
      const article = await Article.find({});
      res.send(article);
    } catch (error) {
      res.status(500).json({ message: "INTERNAL_SERVER_ERROR" });
    }
  };
  
  //get article by Id
  const getArticle = async (req, res) => {
    try {
      const { id } = req.params;
      const article = await Article.findById(id)
        .populate("createdBy")
        .populate("category");
      if (!article) {
        return res.status(400).json({ message: "Article not found" });
      }
      res.send(article);
    } catch (error) {
      res.status(500).json({ message: "INTERNAL_SERVER_ERROR" });
    }
  };
  
  //Delete article
const deleteArticle = async (req, res) => {
    try {
      const { id } = req.params;
  
      let article = await Article.findByIdAndDelete(id);
      if (!article) {
        return res.status(400).json({ message: "Category not found" });
      }
      
      res.send(article);
    } catch (error) {
      res.status(404).json({ message: "Article not found!" });
    }
  };

  
//delete article by authors

const deleteUserArticles = async (req, res) => { 
    try {
      const {id} = req.params;
      const removeArticles = await Article.deleteMany({createdBy: id });
      res.send(removeArticles);
    } catch (error) {
      res.status(404).json({ message: "User not found!" });
    }
   }

   module.exports = ({
    getArticles,
    createArticle,
    getArticle,
    deleteArticle,
    deleteUserArticles,
   })