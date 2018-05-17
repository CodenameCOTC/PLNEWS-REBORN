const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  nickname: {
    type: String,
    minlength: 2,
    maxlength: 15,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isContentCreator: {
    type: Boolean,
    default: false
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  avatar: {
    type: String
  },
  Created: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("User", UserSchema);
