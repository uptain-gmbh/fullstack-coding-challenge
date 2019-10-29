import mongoose from "mongoose";

const dotenv = require("dotenv").config();

const dbconn = mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("DB is connected");
  }
);

export default dbconn;
