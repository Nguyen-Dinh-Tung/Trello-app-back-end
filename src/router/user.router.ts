import { checkToken } from "../middleware/checkToken";
import { MmController } from "../controllers/user.controller";
import express from "express";
import { Router, Request, Response } from "express";
const MmRouter = express.Router();

MmRouter.use(checkToken);
MmRouter.post("/test", (req, res, next) => {
  MmController.test(req, res).catch((err) => {
    next(err);
  });
});

export default MmRouter;
