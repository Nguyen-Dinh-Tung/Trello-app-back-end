import mongoose, { Schema } from "mongoose";

const userGoogleSchemas = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  email_verify: String,
  google_id: String,
  image: String,
});

const UsersGoogle = mongoose.model("UsersGoogle", userGoogleSchemas);

export default UsersGoogle;
