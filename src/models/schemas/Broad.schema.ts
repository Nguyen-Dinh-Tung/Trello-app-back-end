import mongoose, { Schema } from "mongoose";

const broadSchema = new mongoose.Schema({
  title: String,
  mode: String,
});

const BroadModels = mongoose.model("broad", broadSchema);

export default BroadModels;