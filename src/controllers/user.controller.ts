import { Request, Response } from "express";
import Users from "../models/schemas/user.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
import { senMail } from "../utils/mailer";

const refreshTokens = {};
export class UserController {
  static async login(req: Request, res: Response) {
    let data = {
      email: req.body.email,
      password: req.body.password,
    };
    let user = await Users.findOne({ email: data.email });
    console.log(
      "🚀 ~ file: user.controller.ts ~ line 44 ~ UserController ~ login ~ user",
      user
    );
    if (!user) {
      return res
        .status(200)
        .json({ message: "Đăng nhập thất bại! Vui lòng thử lại !" });
    }
    // else if (user.email_verify === "false") {
    //   return res.status(200).json({
    //     message: "Tài khoản chưa được xác thực. Vui lòng kiểm tra email !",
    //   });
    // }
    else {
      let comparePassword = await bcrypt.compare(data.password, user.password);
      if (!comparePassword) {
        return res
          .status(200)
          .json({ message: "Sai mật khẩu ! Vui lòng thử lại !" });
      } else {
        let payload = {
          name: user.name,
          password: user.password,
        };
        let secretKey = process.env.SECRET_KEY;
        let token = await jwt.sign(payload, secretKey, {
          expiresIn: process.env.tokenLife,
        });
        // Tạo một mã token khác - Refresh token
        const refreshToken = jwt.sign(payload, process.env.REFESTOKEN, {
          expiresIn: process.env.refreshTokenLife,
        });
        const response = {
          token: token,
          refreshToken: refreshToken,
        };
        refreshTokens[refreshToken] = response;
        return res
          .status(200)
          .json({ message: "Đăng nhập thành công !", data: response });
      }
    }
  }

  static async token(req: Request, res: Response) {

  }

  static async register(req: Request, res: Response) {
    let user = req.body;
    let Email = user.email;
    let userByEmail = await Users.findOne({ email: Email });
    let userByUsername = await Users.findOne({ username: user.username });
    if (userByUsername) {
      return res.json({ message: "Username đã tồn tại !" });
    } else if (userByEmail) {
      return res.json({ message: "Email đã tồn tại !" });
    } else {
      user.password = await bcrypt.hash(
        user.password,
        parseInt(process.env.BCRYPT_SALT_ROUND)
      );

      let data = {
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        password: user.password,
        email_verify: false,
      };

      let newUser = await Users.create(data, (err, user) => {
        if (err) {
          console.log(err);
        } else {
          bcrypt
            .hash(user.email, parseInt(process.env.BCRYPT_SALT_ROUND))
            .then((hashedEmail) => {
              console.log(
                `${process.env.APP_URL}/verify?email=${user.email}&token=${hashedEmail}`
              );
              senMail(
                user.email,
                "Verify Email",
                `<div style="padding: 10px; background-color: blue">
                <div style="padding: 10px; background-color: white;">
                    <h4 style="color: #ee1414; width: 100%; text-align: center; font-size: 20px;">Click here</h4>
                    <div style="color: black; font-size: 35px; width: 100%; text-align: center; height: 50px;"><a href="${process.env.APP_URL}/register/verify?email=${user.email}&token=${hashedEmail}"> Verify </a></div>
                </div>
                </div> `
              );
              return res.status(200).json({
                email: user.email,
                token: hashedEmail,
              });
            });
        }
      });
    }
  }
  static async verify(req: Request, res: Response) {
    console.log(req.body);
    bcrypt.compare(req.body.email, req.body.token, (err, result) => {
      if (result === true) {
        Users.findOneAndUpdate(
          { email: `${req.body.email}` },
          { email_verify: true },
          function (err, docs) {
            if (err) {
              console.log(err);
            } else {
              console.log(1);
              return res.status(200).json({ message: "verify thanh cong!" });
            }
          }
        );
      } else {
        return res.status(200).json({ message: "404" });
      }
    });
  }
}

export default new UserController();
