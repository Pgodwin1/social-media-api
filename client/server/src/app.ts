import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import postRouter from "./routes/posts";
import usersRouter from "./routes/users";
import db from "./config/chatDatabase";

db.sync({ alter: true })
  .then(() => {
    console.log("connectify database is ready to use");
  })
  .catch((err) => console.log("Connectify database is not ready to use", err));

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "...", "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", (req: Request, res: Response) => {
  return res.json({ msg: "Welcome to Connectify",
login: "http://localhost:3000/users/login",
register: "http://localhost:3000/users/register",
createPost: "http://localhost:3000/posts/create-post",
getPosts: "http://localhost:3000/posts/get-posts",
getSinglePost: "http://localhost:3000/posts/get-single-post/:id",
updatePost: "http://localhost:3000/posts/update-post/:id",
deletePost: "http://localhost:3000/posts/delete-post/:id",
followUser: "http://localhost:3000/users/follow-user/:id",
getUser: "http://localhost:3000/users/get-info/:id",
updateInfo: "http://localhost:3000/users/update-info/:id",
deleteInfo: "http://localhost:3000/users/delete-info/:id",
});
});
app.use("/posts", postRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (
  err: createError.HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
