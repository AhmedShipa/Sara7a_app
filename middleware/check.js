import { User } from "../models/user.model.js";

export const checkEmail = async (req, res, next) => {
  const userEmail = await User.findOne({ email: req.body.email });
  console.log(userEmail);
  if (userEmail) return res.json({ message: `email already exist` });
  next();
};
