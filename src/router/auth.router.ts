import express from "express";
import { Router, Request, Response } from "express";
const authRouter = express.Router();
import { userValidation, validateUserSignUp } from "../middleware/validation";
import BroadModels from "../models/schemas/Broad.schema";
import { AuthController } from "../controllers/auth.controller";

authRouter.post("/login", (req, res, next) => {
  AuthController.login(req, res).catch((err) => {
    next(err);
  });
});
authRouter.post(
  "/register",
  validateUserSignUp,
  userValidation,
  (req, res, next) => {
    AuthController.register(req, res).catch((err) => {
      next(err);
    });
  }
);

authRouter.post("/verify", (req, res, next) => {
  AuthController.verify(req, res).catch((err) => {
    next(err);
  });
});
authRouter.post("/token", (req, res, next) => {
  AuthController.token(req, res).catch((err) => {
    next(err);
  });
});
authRouter.post("/google", (req, res, next) => {
  AuthController.registerGoogle(req, res).catch((err) => {
    next(err);
  });
});

authRouter.post("/broad", async (req: Request, res: Response) => {
  let title = req.body.title;
  let mode = req.body.mode;
  if (title && mode) {
    const newBroad = await BroadModels.create({ title: title, mode: mode });
    if (newBroad) {
      res.status(200).json({
        message: "Create success",
        id: newBroad._id,
      });
    } else {
      res.status(200).json({
        message: "Create fail",
      });
    }
    res.status(200).json({
      message: "Create fail because  not valid",
    });
  }
});

export default authRouter;
