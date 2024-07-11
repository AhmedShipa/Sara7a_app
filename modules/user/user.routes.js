import express from "express";
import { confirmEmail, getUsers, login, signUp } from "./user.controller.js";
import { checkEmail } from "../../middleware/check.js";
import { validate } from "../../middleware/validate.js";
import { signInVal, signUpVal } from "./user.validate.js";

export const userRouter = express.Router();

userRouter.get("/user", getUsers);
userRouter.post("/user", validate(signUpVal), checkEmail, signUp);
userRouter.post("/Login", validate(signInVal), login);
userRouter.patch("/confirmEmail", confirmEmail);
