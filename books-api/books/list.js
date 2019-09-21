"use strict";

const dynamodb = require("./dynamodb");

module.exports.list = async (event, context) => {
  var params = {
    TableName: process.env.CONFIG_BOOKS_TABLE,
    ProjectionExpression: "id, title, isbn"
  };

  let result = await dynamodb.scan(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      books: result.Items
    })
  };
};
