const passport = require("passport");

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

module.exports = middlewareObj;
