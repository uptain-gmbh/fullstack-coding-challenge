"use strict";
const uuid = require("uuid");
const dynamodb = require("./dynamodb");
const { validate } = require("./book");

module.exports.create = async (event, context) => {
  const data = JSON.parse(event.body);

  // Validate input data.
  const { error } = validate(data);
  if (error)
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: error.details[0].message
      })
    };

  const params = {
    TableName: process.env.CONFIG_BOOKS_TABLE,
    Item: bookInfo(data.title, data.isbn)
  };

  // Persist data.
  try {
    await dynamodb.put(params).promise();
    return { statusCode: 200, body: JSON.stringify(params.Item) };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Unable to add book."
      })
    };
  }
};

const bookInfo = (title, isbn) => {
  const timestamp = new Date().getTime();
  return {
    id: "" + uuid.v1(),
    title: title,
    isbn: isbn,
    createdAt: timestamp,
    updatedAt: timestamp
  };
};
