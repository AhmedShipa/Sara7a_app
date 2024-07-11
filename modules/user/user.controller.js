import { User } from "../../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { customAlphabet, nanoid } from "nanoid";
import { email } from "../../email/email.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utilities/appError.js";

// signUp
const signUp = catchError(async (req, res, next) => {
  // check email in the middleware => checkEmail.js
  req.body.password = bcrypt.hashSync(String(req.body.password), 8);
  // generating OTP
  const code = customAlphabet("123456789", 4);
  req.body.OTP = code();
  // sending OTP
  email(req.body.OTP);
  await User.insertMany(req.body);
  // setting the time of produced OTP
  const dateNow = new Date();
  const updatedUser = await User.findOneAndUpdate(
    { email: req.body.email },
    { producedAT: dateNow },
    { new: true }
  );
  updatedUser.password = undefined;
  // hiding password from response
  res.status(201).json({ message: `user added successfully`, updatedUser });
});

// confirmEmail
const confirmEmail = catchError(async (req, res, next) => {
  let dateNow = new Date();
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError(`invalid email`, 401));

  // setting time for expire of OTP
  function dateDifference(date1, date2) {
    const newDate1 = new Date(String(date1)).getMinutes();
    const newDate2 = new Date(date2).getMinutes();

    return newDate1 - newDate2;
  }
  let difference = dateDifference(dateNow, user.producedAT);
  if (req.body.OTP != user.OTP || req.body.OTP == null || difference > 3) {
    // removing OTP if expired time
    await User.updateOne(
      { email: req.body.email },
      { OTP: null, expiredAt: dateNow }
    );
    return next(new AppError(`invalid OTP`, 401));
  }
  // verification of user and setting the expire date of OTP
  await User.updateOne(
    { email: req.body.email },
    { isVerified: true, OTP: null, expiredAt: dateNow }
  );
  res.json({ message: "email confirmed" });
});

// getUsers
const getUsers = catchError(async (req, res, next) => {
  const user = await User.find();
  res.json({ user });
});

// login
const login = catchError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (
    !user ||
    !bcrypt.compareSync(String(req.body.password), String(user.password))
  )
    return next(new AppError(`invalid email or password`, 401));
  // check if user confirmed email
  if (user.isVerified == false)
    return next(new AppError(`please confirm your email`, 401));
  jwt.sign(
    { email: req.body.email, userId: user._id },
    "secretKeyToken",
    (err, token) => {
      res.json({ message: `login`, token });
    }
  );
});

export { signUp, getUsers, login, confirmEmail };
