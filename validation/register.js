const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Check req.body with isEmpty
  data.nickname = !isEmpty(data.nickname) ? data.nickname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.nickname, { min: 2, max: 20 })) {
    errors.nickname = "Nickname length must be between 2 and 30 characters";
  }

  if (!Validator.isAlphanumeric(data.nickname)) {
    errors.nickname =
      "Nickname can not have any special character, only alphanumeric please. example: JohnDoe";
  }

  if (Validator.isEmpty(data.nickname)) {
    errors.nickname = "Nickname field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Min password length is 6 and max is 30";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Password Comfirmation is requried";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Comfirmation Password is incorrect";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
