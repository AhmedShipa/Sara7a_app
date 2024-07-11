import express, { application } from "express";
import {
  addMessage,
  deleteMessage,
  getMessages,
  updateMessage,
} from "./message.controller.js";
import { verifyToken } from "../../middleware/verifyToken.js";
import { validate } from "../../middleware/validate.js";
import { addNoteVal, updateNoteVal } from "./message.validate.js";
export const msgRouter = express.Router();

msgRouter.use(verifyToken);
msgRouter.get("/message", getMessages);
msgRouter.post("/message", validate(addNoteVal), addMessage);
msgRouter.put("/message/:id", validate(updateNoteVal), updateMessage);
msgRouter.delete("/message/:id", deleteMessage);
