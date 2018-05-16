const isEmpty = require("./is-empty");
const Validator = require("validator");

module.exports = function validateNewsInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.image = !isEmpty(data.image) ? data.image : "";
  data.tags = !isEmpty(data.tags) ? data.tags : "";
  data.body = !isEmpty(data.body) ? data.body : "";

  if (!Validator.isLength(data.title, { min: 5, max: 40 })) {
    errors.title = "Title must be between 5 and 40";
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (!Validator.isURL(data.image)) {
    errors.image = "Not a valid URL";
  }

  if (Validator.isEmpty(data.image)) {
    errors.image = "Image field is required";
  }

  if (!Validator.isLength(data.body, { min: 50 })) {
    errors.body = "Too short, please try to add a few words";
  }

  if (Validator.isEmpty(data.body)) {
    errors.body = "Body field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
