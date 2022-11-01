import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

module.exports = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        console.error(err.toString());
        return res
          .status(401)
          .json({ error: true, message: "Unauthorized access.", err });
      }
      console.log(`decoded>>${decoded}`);
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).send({
      error: true,
      message: "No token provided.",
    });
  }
};
