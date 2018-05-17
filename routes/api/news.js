const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load News Models
const News = require("../../models/News");

// Load Comments Models
const Comments = require("../../models/Comments");

// Load Middleware
const middlewareObj = require("../../middleware/index");

// Load Validation
const validateNewsInput = require("../../validation/new-news");
const validateCommentsInput = require("../../validation/comments");

// @route   GET api/news
// @desc    Showing all news
// @access  Only Admin
router.get("/", (req, res) => {
  News.find()
    .sort({ date: -1 })
    .then(news => res.status(200).json(news))
    .catch(err => res.status(500).json(err));
});

// @route   POST api/news
// @desc    Post news
// @access  Only Admin
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  middlewareObj.isContentCreator,
  (req, res) => {
    const { errors, isValid } = validateNewsInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newNews = {};

    // Splice tags by ,
    if (req.body.tags.length > 0) newNews.tags = req.body.tags.split(",");

    newNews.title = req.body.title;
    newNews.image = req.body.image;
    newNews.body = req.body.body;
    newNews.author = req.user._id;

    News.create(newNews)
      .then(news => res.status(200).json(news))
      .catch(err => res.status(500).json(err));
  }
);

// @route   GET api/news/:news_id
// @desc    Showing news detail
// @access  Public
router.get("/:news_id", (req, res) => {
  News.findById(req.params.news_id)
    .populate({ path: "author", select: "name avatar _id" })
    .populate({
      path: "comments",
      populate: { path: "author", select: "name avatar _id" }
    })
    .exec()
    .then(news => res.status(200).json(news))
    .catch(err => res.status(405).json("Not Acceptable"));
});

// @route   PUT api/news/:news_id
// @desc    Edit news
// @access  Private
router.put(
  "/:news_id",
  passport.authenticate("jwt", { session: false }),
  middlewareObj.isContentCreator,
  (req, res) => {
    News.findByIdAndUpdate(req.params.news_id, req.body)
      .then(news =>
        res.status(200).json({ msg: `${news.title} has been updated` })
      )
      .catch(err => res.status(500).json(err));
  }
);

// @route   DELETE api/news/:news_id
// @desc    Deleting news
// @access  Private
router.delete(
  "/:news_id",
  passport.authenticate("jwt", { session: false }),
  middlewareObj.isContentCreator,
  (req, res) => {
    News.findByIdAndRemove(req.params.news_id).then(news =>
      res.status(200).json({ msg: `${news.title} has been deleting` })
    );
  }
);

// @route   POST api/news/:news_id/comments
// @desc    Post comments
// @access  Private
router.post(
  "/:news_id/comments",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCommentsInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newComment = {
      text: req.body.text,
      author: req.user._id
    };
    console.log(newComment);
    // Find News
    News.findById(req.params.news_id)
      .then(news => {
        // Check news founds
        if (news) {
          // Creating comment
          Comments.create(newComment)
            .then(comment => {
              news.comments.push(comment);
              news.save();
              res.redirect(`/api/news/${req.params.news_id}`);
            })
            .catch(err => res.status(500).json(err));
        } else {
          res.status(404).json("News not found");
        }
      })
      .catch(err => res.status(500).json(err));
  }
);

// @route   DELETE api/news/:news_id/comments/:comment_id
// @desc    Delete comment
// @access  Private
router.delete(
  "/:news_id/comments/:comment_id",
  passport.authenticate("jwt", { session: false }),
  middlewareObj.checkCommentOwnership,
  (req, res) => {
    News.findById(req.params.news_id)
      .then(news => {
        // Check if news found
        if (news) {
          // Find index id on comments array
          const index = news.comments.indexOf(req.params.comment_id);
          // Remove comment_id on comments array
          if (index > -1) {
            news.comments.splice(index, 1);
          }
          // Save
          news.save();
          Comments.findByIdAndRemove(req.params.comment_id)
            .then(() => res.redirect(`/api/news/${req.params.news_id}`))
            .catch(err => res.status(500).json(err));
        } else {
          res.status(404).json("404 NOT FOUND");
        }
      })
      .catch(err => res.status(500).json(err));
  }
);

module.exports = router;
