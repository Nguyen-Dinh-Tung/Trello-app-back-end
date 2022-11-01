import express from "express";
import { Router, Request, Response } from "express";
const AuthRouter = express.Router();
import { userValidation, validateUserSignUp } from "../middleware/validation";

import { UserController } from "../controllers/user.controller";

AuthRouter.post("/login", (req, res, next) => {
  UserController.login(req, res).catch((err) => {
    next(err);
  });
});
AuthRouter.post(
  "/register",
  validateUserSignUp,
  userValidation,
  (req, res, next) => {
    UserController.register(req, res).catch((err) => {
      next(err);
    });
  }
);

AuthRouter.post("/verify", (req, res, next) => {
  UserController.verify(req, res).catch((err) => {
    next(err);
  });
});
AuthRouter.post("/token", (req, res, next) => {
  UserController.token(req, res).catch((err) => {
    next(err);
  });
});

export default AuthRouter;
