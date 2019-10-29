import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
  title: {
    type: String
  }
});

const Model = mongoose.model("post", PostSchema);
export default Model;
