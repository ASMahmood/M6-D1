const express = require("express");
const ArticleSchema = require("./schema");

const articleRouter = express.Router();

articleRouter.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const newArticle = new ArticleSchema(req.body);
    const { _id } = await newArticle.save();
    res.status(201).send(_id);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

articleRouter.get("/", async (req, res) => {
  try {
    const allArticles = await ArticleSchema.find();
    res.send(allArticles);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

articleRouter.get("/:id", async (req, res) => {
  try {
    const article = await ArticleSchema.findById(req.params.id);
    res.send(article);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = articleRouter;
