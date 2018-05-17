const isEmpty = require("./is-empty");
const Validator = require("validator");

module.exports = function validateCommentsInput(data) {
  let errors = {};

  // Check req.body with isEmpty
  data.text = !isEmpty(data.text) ? data.text : "";

  // Validator Checking
  if (!Validator.isLength(data.text, { min: 3, max: 45 })) {
    errors.comments = "Comment length must be between 3 and 45";
  }

  if (Validator.isEmpty(data.text)) {
    errors.comments = "Comments filed is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
