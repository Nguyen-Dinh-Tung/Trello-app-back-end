import express from "express";
import { Router, Request, Response } from "express";
const usersRouter = express.Router();
import { userValidation, validateUserSignUp } from "../middleware/validation";
import { UserController } from "../controllers/user.controller";
import BroadModels from "../models/schemas/Broad.schema";
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
usersRouter.post("/token", (req, res, next) => {
  UserController.token(req, res).catch((err) => {
    next(err);
  });
});

usersRouter.post('/broad', async (req: Request, res: Response) => {
  let title = req.body.title;
  let mode = req.body.mode;
  if (title && mode) {
    const newBroad = await BroadModels.create({ title: title, mode: mode })
    if (newBroad) {
      res.status(200).json({
        message: 'Create success',
        id: newBroad._id
      })
    } else {
      res.status(200).json({
        message: 'Create fail'
      })
    } res.status(200).json({
      message: 'Create fail because  not valid'
    })
  }
})
export default usersRouter;
