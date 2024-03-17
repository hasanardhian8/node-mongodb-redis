import { Schema, model } from "mongoose";

const contentSchema = new Schema(
  {
    name: { type: String },
    value: { type: String },
  },
  {
    versionKey: false,
  }
);

export default model("Content", contentSchema);
