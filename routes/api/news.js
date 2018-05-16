const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load News Model
const News = require("../../models/News");

// Load Middleware
const middlewareObj = require("../../middleware/index");

// Load Validation
const validateNewsInput = require("../../validation/new-news");

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
    .populate({ path: "comments.author", select: "name avatar _id" })
    .exec()
    .then(news => res.status(200).json(news))
    .catch(err => res.status(405).json("Not Acceptable"));
});

// @route   POST api/news/:news_id/comments
// @desc    Post comments
// @access  Private
router.post(
  "/:news_id/comments",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    News.findById(req.params.news_id)
      .then(news => {
        if (news) {
          const newComment = {
            text: req.body.text,
            author: req.user._id
          };
          // Add comments to array
          news.comments.unshift(newComment);

          // Save
          news.save().then(news => res.status(200).json(news));
        } else {
          res.status(404).json({ msg: "ERROR 404 NOT FOUND" });
        }
      })
      .catch(err => res.status(500).json(err));
  }
);

module.exports = router;
