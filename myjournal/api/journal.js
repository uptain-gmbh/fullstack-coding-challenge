'use strict';

const AWS = require('aws-sdk');
const dbAdapter = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports.write = async (event) => {
  try {
    let parsedBody = JSON.parse(event.body);
    let table = "JournalData";  //hardcoded - TEMPORARY
    let ID = uuid.v1();
    let title = parsedBody.title;
    let content = parsedBody.content;
    let mood = parsedBody.mood;

    let params = {
      TableName: table,
      Item: {
        "id": ID,
        "title": title,
        "content": content,
        "mood": mood
      }
    }
    let result = await dbAdapter.put(params).promise();
    if (result) {
      console.log("Writing data into DB. Result is >>>>>>>>>", result);
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
      body: JSON.stringify(
        {
          message: 'Written to journal successfully!',
          input: (parsedBody),
        },
        null,
        2
      ),
    };
  } catch (error) {
    console.log(error);
    return error;
  }

};

module.exports.getAll = async (event) => {
  let table = "JournalData";

  let params = {
    TableName: table,
  }

  try {
    let result = await dbAdapter.scan(params).promise();
    if (result) {
      console.log("Fetchinf all data from DB. Result is >>>>>>>>>", result);
    }


    return {
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
      body: JSON.stringify({
        message: "Executed succesfully",
        data: result
      })
    }
  } catch (error) {
    console.log(error);
  }
};

