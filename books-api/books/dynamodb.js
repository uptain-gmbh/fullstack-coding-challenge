"use strict";

const CONFIG_DYNAMODB_ENDPOINT = process.env.CONFIG_DYNAMODB_ENDPOINT;
const IS_OFFLINE = process.env.IS_OFFLINE;

const AWS = require("aws-sdk");

let options = {};

// connect to local DB if running offline
if (IS_OFFLINE) {
  options = {
    region: "localhost",
    endpoint: CONFIG_DYNAMODB_ENDPOINT
  };
}

const client = new AWS.DynamoDB.DocumentClient(options);

module.exports = client;
