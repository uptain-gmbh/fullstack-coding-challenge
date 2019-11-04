'use strict';
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const uuid = require('uuid/v4');

const productTable = process.env.PRODUCT_TABLE;

function response(statusCode, message) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message)
  }
}

// Create product item
module.exports.createProduct = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);

  const product = {
    id: uuid(),
    productName: requestBody.productName
  }

  return db
  .put({
    TableName: productTable,
    Item: product
  })
  .promise()
  .then(() => {
    callback(null, response(201, product))
  })
  .catch((err) => response(null, response(err.statusCode, err.message)));

}


// Get all product items
module.exports.getAllProducts = (event, context, callback) => {
  return db
  .scan({
    TableName: productTable
  })
  .promise()
  .then((res) => {
    callback(null, response(200, res.Items))
  })
  .catch((err) => response(null, response(err.statusCode, err.message)));
}
