const Joi = require("joi");

function validateBook(book) {
  const schema = {
    title: Joi.string()
      .min(1)
      .max(50)
      .required(),
    isbn: Joi.string()
      .length(5)
      .required()
  };

  return Joi.validate(book, schema);
}

exports.validate = validateBook;
