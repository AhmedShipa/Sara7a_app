process.on("uncaughtException", (err) => {
  console.log("error in code", err);
});

import express from "express";
const app = express();
const port = process.env.PORT || 3000;
import { dbConnection } from "./dbConnection/dbConnection.js";
import { AppError } from "./utilities/appError.js";
import { globalError } from "./middleware/globalError.js";
import { routes } from "./index.routes.js";
import cors from "cors";

routes(app);
// handling unhandled routes
app.use("*", (req, res, next) => {
  next(new AppError(`route not found ${req.originalUrl}`), 404);
});

app.use(globalError);
// handling error in port
process.on("unhandledRejection", (err) => {
  console.log("err", err);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
