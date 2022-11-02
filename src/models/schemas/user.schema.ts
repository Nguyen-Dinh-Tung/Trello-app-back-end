import mongoose, { Schema } from "mongoose";

const userSchemas = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  email_verify: String,
  image: String,
  password: String,
});

const Users = mongoose.model("Users", userSchemas);

export default Users;
