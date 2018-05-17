const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
  text: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  created: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Comments = mongoose.model("Comments", CommentsSchema);
