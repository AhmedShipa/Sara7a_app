import { msgRouter } from "./modules/message/message.routes.js";
import { userRouter } from "./modules/user/user.routes.js";
import express from "express";
export const routes = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(userRouter);
  app.use(msgRouter);
};
