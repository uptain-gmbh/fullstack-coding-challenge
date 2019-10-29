import dbconn from "./dbconn";
import Model from "./postModel";
import mongoose from "mongoose";

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const AllPost = await Model.find({}).then(res => {
      callback(null, {
        statusCode: 200,
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(res)
      });
    });
  } catch (error) {
    throw error;
  }
};
