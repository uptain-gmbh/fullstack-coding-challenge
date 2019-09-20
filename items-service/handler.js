'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports.getItems = (event, context, callback) => {
  return dynamoDb.scan({ TableName: "Items" }).promise()
  .then(response => {
    callback(null, { statusCode: 200, body: response.Items });
   })
};

module.exports.createItem = (event, context, callback) => {
  const dynamoDbData = {
    "TableName":"Items",
    "Item":{
        "id": uuid.v4(),
        "title": event.body.title,
        "description": event.body.description,
    },
  }
  return dynamoDb.put(
    dynamoDbData,
    err => {
      if (err) {
        callback(null, { statusCode: 400 });
        return
      }
      callback(null, { statusCode: 201 });
    }
  );
};
