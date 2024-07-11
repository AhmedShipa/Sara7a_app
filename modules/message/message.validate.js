import Joi from "joi";
const addNoteVal = Joi.object({
  content: Joi.string().min(2).max(100).required(),
  receiverId: Joi.string().hex().length(24).required(),
});

const updateNoteVal = Joi.object({
  content: Joi.string().min(2).max(100).required(),
  id: Joi.string().hex().length(24).required(),
});
export { addNoteVal, updateNoteVal };
