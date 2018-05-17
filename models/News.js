const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
  title: {
    type: String,
    maxlength: 40,
    minlength: 5,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  tags: {
    type: [String]
  },
  created: {
    type: Date,
    default: Date.now
  },
  body: {
    type: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments"
    }
  ]
});

module.exports = News = mongoose.model("News", NewsSchema);
