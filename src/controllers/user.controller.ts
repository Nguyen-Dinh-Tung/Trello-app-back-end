import { Request, Response } from "express";
import Users from "../models/schemas/user.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
export class MmController {
  static async test(req: Request, res: Response) {
    res.json({ status: "success tuyen", elements: "hello" });
  }
}

export default new MmController();
