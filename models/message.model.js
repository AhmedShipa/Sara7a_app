import mongoose, { model, Schema } from "mongoose";

const schema = new Schema(
  {
    content: String,
    receiverId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    versionKey: false,
  }
);

export const Message = model("Message", schema);
