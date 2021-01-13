const express = require("express");
const mongoose = require("mongoose");
const ArticleSchema = require("./schema");
const ReviewSchema = require("../reviews/schema");

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

articleRouter.put("/:id", async (req, res) => {
  try {
    const article = await ArticleSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { runValidators: true, new: true }
    );
    if (article) {
      res.send(article);
    } else {
      res.status(404).send("ARTICLE NOT FOUND");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

articleRouter.delete("/:id", async (req, res) => {
  try {
    const article = await ArticleSchema.findByIdAndDelete(req.params.id);
    if (article) {
      res.send("ARTICLE DELETED");
    } else {
      res.status(404).send("ARTICLE NOT FOUND");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

articleRouter.post("/:id", async (req, res) => {
  try {
    const newReview = new ReviewSchema(req.body);
    const review = await newReview.save();
    const article = await ArticleSchema.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          reviews: review,
        },
      },
      { runValidators: true, new: true }
    );
    res.status(201).send(article);
  } catch (error) {
    console.log(error);
  }
});

articleRouter.get("/:id/reviews", async (req, res) => {
  try {
    const reviews = await ArticleSchema.findById(req.params.id, { reviews: 1 });
    res.status(200).send(reviews.reviews);
  } catch (error) {
    console.log(error);
  }
});

articleRouter.get("/:id/reviews/:reviewID", async (req, res) => {
  try {
    const selectedReview = await ArticleSchema.findOne(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      {
        reviews: {
          $elemMatch: { _id: mongoose.Types.ObjectId(req.params.reviewID) },
        },
      }
    );
    if (selectedReview) {
      res.status(200).send(selectedReview.reviews[0]);
    } else {
      res
        .status(404)
        .send(`We couldn't find a review with the id ${req.params.reviewID}`);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = articleRouter;
