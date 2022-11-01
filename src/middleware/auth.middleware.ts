import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export const authLogin = (req: any, res: Response, next: NextFunction) => {
  let authorization = localStorage.getItem("token");

  if (authorization) {
    let accessToken = authorization;
    if (!accessToken) {
      res.status(401).json({ message: "Access token is required1." });
    } else {
      let newdata = JSON.parse(accessToken);
      // console.log(newdata);
      jwt.verify(newdata.token, process.env.SECRET_KEY, (err, data) => {
        if (newdata.role === "admin") {
          if (err) {
            res.status(401).json({ message: "Access token is required2." });
          } else {
            req.decoded = data;
            next();
          }
        } else {
          res.status(401).json({ message: "Access token is required2." });
        }
      });
    }
  } else {
    res.status(401).json({ message: "Access token is required3." });
  }
};
