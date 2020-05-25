'use strict';
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

const postsTable = process.env.POSTS_TABLE;

/**
 * Response
 * @param {Number} statusCode
 * @param {Object} message 
 * @return {boolean} return response
 */
function response(statusCode, message) {
  return {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(message)
  };
}

function sortByDate(a, b) {
  if (a.createdAt > b.createdAt) {
    return -1;
  } else return 1;
}

/**
 * Generates Unique ID
 * @return {String} return unique ID
 */
let generateUniqueId = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

/**
 * Add New Items
 * @param {String} event
 * @param {Object} message
 * @param {Function} callback function 
 * @return {Object} return response
 */
module.exports.addNewItems = (event, context, callback) => {
  const reqBody = event;
  const itemValue = JSON.parse(reqBody.body);

  const post = {
    id: generateUniqueId(),
    createdAt: new Date().toISOString(),
    userId: 1,
    item: itemValue.item
  };

  return db.put({
      TableName: postsTable,
      Item: post
    }).promise().then(() => {
      callback(null, response(201, post));
    }).catch((err) => response(null, response(err.statusCode, err)));
};

/**
 * GET All Items
 * @param {String} event
 * @param {Object} message
 * @param {Function} callback function 
 * @return {Object} return response
 */
module.exports.getAllItems = (event, context, callback) => {
  return db.scan({
      TableName: postsTable
    }).promise().then((res) => {
      callback(null, response(200, res.Items.sort(sortByDate)))
    }).catch((err) => callback(null, response(err.statusCode, err)));
};
