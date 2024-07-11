import Joi from "joi";
const signUpVal = Joi.object({
  userName: Joi.string().min(2).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^[A-Za-z1-9]{8,40}$/)
    .required(),
});
const signInVal = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^[A-Za-z1-9]{8,40}$/)
    .required(),
});

export { signUpVal, signInVal };
