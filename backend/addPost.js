import dbconn from "./dbconn";
import Model from "./postModel";
import mongoose from "mongoose";

exports.handler = async (event, context, callback) => {
  try {
    const data = JSON.parse(event.body);

    const AddPost = new Model(data);

    await AddPost.save().then(res => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(AddPost)
      });
    });
  } catch (error) {}
};
