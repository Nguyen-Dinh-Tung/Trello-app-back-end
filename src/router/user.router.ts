import express from "express";
import { Router, Request, Response } from "express";
const usersRouter = express.Router();
import { userValidation, validateUserSignUp } from "../middleware/validation";

import { UserController } from "../controllers/user.controller";

usersRouter.post("/login", (req, res, next) => {
  UserController.login(req, res).catch((err) => {
    next(err);
  });
});
usersRouter.post(
  "/register",
  validateUserSignUp,
  userValidation,
  (req, res, next) => {
    UserController.register(req, res).catch((err) => {
      next(err);
    });
  }
);

usersRouter.post("/verify", (req, res, next) => {
  UserController.verify(req, res).catch((err) => {
    next(err);
  });
});
usersRouter.post('/broad', (req: Request, res: Response) => {
})
export default usersRouter;
