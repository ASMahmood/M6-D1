const { Schema, model } = require("mongoose");

const ArticleSchema = new Schema(
  {
    headLine: {
      type: String,
      required: true,
    },
    subHead: String,
    content: {
      type: String,
      required: true,
    },
    category: {
      name: String,
      img: String,
    },
    author: {
      name: String,
      img: String,
    },
    reviews: Array,
    cover: String,
  },
  { timestamps: true }
);

module.exports = model("Articles", ArticleSchema);
