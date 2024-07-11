import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    userName: String,
    email: String,
    password: String,
    OTP: Number,
    isVerified: {
      type: Boolean,
      default: false,
    },
    producedAT: {
      type: Date,
      default: null,
    },
    expiredAt: {
      type: Date,
      default: null,
    },
  },
  {
    versionKey: false,
  }
);

export const User = model("User", schema);
