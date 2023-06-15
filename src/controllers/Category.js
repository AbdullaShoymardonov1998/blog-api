const Article = require("../models/Article");
const Category = require("../models/Category");

//Create Category

const createCategory = async (req, res) => {
    try {
      const { name } = req.body;
      const newCategory = new Category({
        name,
      });
  
      const saveCategory = await newCategory.save();
      return res.send(saveCategory);
    } catch (error) {
      res.status(500).json({ message: "INTERNAL_SERVER_ERROR" });
    }
  };
  
  // Get category
  const getCategory = async (req, res) => {
    try {
      const category = await Category.find({});
  
      res.send(category);
    } catch (error) {
      res.status(500).json({ message: "INTERNAL_SERVER_ERROR" });
    }
  };
  
  // Get category by Id
  const getCategoryById = async (req, res) => {
    try {
      const { id } = req.params;
      const categoryById = await Category.findById(id);
      if (!categoryById) {
        return res.status(400).json({ message: "Category not found" });
      }
      res.send(categoryById);
    } catch (error) {
      res.status(500).json({ message: "INTERNAL_SERVER_ERROR" });
    }
  };

  //Delete category
const deleteCategory = async (req, res) => {
    try {
      const { id } = req.params;
      
      const countArticles  = await Article.countDocuments({category: id});
      if(countArticles > 0){
       return res.status(400).json({message:"Category contains articles"})
      }
  
      let category = await Category.findByIdAndDelete(id);
      if (!category) {
        return res.status(400).json({ message: "Article not found" });
      }
      res.send(category);
    } catch (error) {
      res.status(404).json({ message: "Article not found!" });
    }
  };

  module.exports = {
    createCategory,
    getCategory,
    getCategoryById,
    deleteCategory,
  };
  