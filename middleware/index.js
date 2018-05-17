const passport = require("passport");

// Load News Models
const News = require("../models/News");

// Load Comments Models
const Comments = require("../models/Comments");

const middlewareObj = {};

// Check role user
middlewareObj.isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(400).json("Unauthorization");
  }
};

middlewareObj.isContentCreator = (req, res, next) => {
  if (req.user.isContentCreator) {
    next();
  } else {
    res.status(400).json("Unauthorization");
  }
};

// Check comment ownership
middlewareObj.checkCommentOwnership = (req, res, next) => {
  Comments.findById(req.params.comment_id).then(comment => {
    if (comment) {
      if (comment.author.equals(req.user._id) || req.user.isAdmin) {
        return next();
      }
    }
    res.status(400).json("Unauthorization");
  });
};

module.exports = middlewareObj;
