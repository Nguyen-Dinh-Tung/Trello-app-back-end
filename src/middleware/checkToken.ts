import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
dotenv.config();

export const checkToken = (req: any, res: Response, next: NextFunction) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (token) {
    console.log(
      "🚀 ~ file: checkToken.ts ~ line 11 ~ checkToken ~ token",
      token
    );
    jwt.verify(token, process.env.SECRET_KEY, function (err: any, decoded) {
      if (err) {
        // console.log(11);
        return res
          .status(200)
          .json({ error: false, message: "Unauthorized access.", err });
      }
      req.decoded = decoded;
      console.log(`decoded>>${decoded}`);
      next();
    });
  } else {
    // console.log(1);
    return res.status(403).send({
      error: true,
      message: "No token provided.",
    });
  }
};
