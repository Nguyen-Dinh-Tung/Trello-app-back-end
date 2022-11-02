import { Request, Response } from "express";
import Users from "../models/schemas/user.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
import { senMail } from "../utils/mailer";
import jwt_decode from "jwt-decode";

const refreshTokens = {};
export class AuthController {
  static async login(req: Request, res: Response) {
    let data = {
      email: req.body.email,
      password: req.body.password,
    };
    let user = await Users.findOne({ email: data.email });
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
          expiresIn: 15,
        });
        // Tạo một mã token khác - Refresh token
        const refreshToken = jwt.sign(payload, process.env.REFESTOKEN, {
          expiresIn: 300,
        });
        const response = {
          token: token,
          refreshToken: refreshToken,
        };
        // refreshTokens[refreshToken] = response;
        return res
          .status(200)
          .json({ message: "Đăng nhập thành công !", data: response });
      }
    }
  }

  static async token(req: any, res: Response) {
    const refreshTokenClient = req.body;
    if (refreshTokenClient) {
      const dataClient = jwt.decode(refreshTokenClient.refreshToken);
      let sendData = {
        name: dataClient["name"],
        password: dataClient["password"],
      };
      console.log(
        "🚀 ~ file: auth.controller.ts ~ line 67 ~ AuthController ~ token ~ sendData",
        sendData
      );

      const token = jwt.sign(sendData, process.env.SECRET_KEY, {
        expiresIn: 15,
      });
      const refreshToken = jwt.sign(sendData, process.env.REFESTOKEN, {
        expiresIn: 300,
      });
      const response = {
        token: token,
        refreshToken: refreshToken,
      };
      res.status(200).json(response);
    } else {
      res.status(400).send("Invalid request");
    }
  }

  static async register(req: Request, res: Response) {
    let user = req.body;
    console.log(
      "🚀 ~ file: user.controller.ts ~ line 62 ~ UserController ~ register ~ user",
      user
    );
    let Email = user.email;
    let userByEmail = await Users.findOne({ email: Email });
    let userByName = await Users.findOne({ name: user.name });
    if (userByName) {
      return res.json({ message: "Name đã tồn tại !" });
    } else if (userByEmail) {
      return res.json({ message: "Email đã tồn tại !" });
    } else {
      user.password = await bcrypt.hash(
        user.password,
        parseInt(process.env.BCRYPT_SALT_ROUND)
      );

      let data = {
        name: user.name,
        email: user.email,
        password: user.password,
        email_verify: false,
        image: "",
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
  static async registerGoogle(req: Request, res: Response) {
    console.log(req.body);
    let data = {
      name: req.body.name,
      email: req.body.email,
      google_id: req.body.sub,
      image: req.body.picture,
      role: "user",
      email_verify: req.body.email_verified,
    };

    let userByGoogleId = await Users.findOne({
      email: data.email,
    });
    console.log(
      "🚀 ~ file: auth.controller.ts ~ line 189 ~ AuthController ~ registerGoogle ~ userByGoogleId",
      userByGoogleId
    );

    if (userByGoogleId) {
      let payload = {
        name: userByGoogleId.name,
        email: userByGoogleId.email,
        role: userByGoogleId.role,
        image: userByGoogleId.image,
      };
      let secretKey = process.env.SECRET_KEY;
      4;
      let token = await jwt.sign(payload, secretKey, {
        expiresIn: 15,
      });
      const refreshToken = jwt.sign(payload, process.env.REFESTOKEN, {
        expiresIn: 300,
      });
      const response = {
        token: token,
        refreshToken: refreshToken,
      };
      return res
        .status(200)
        .json({ message: "Đăng nhập thành công !", data: response });
    } else {
      let newData = {
        name: req.body.name,
        email: req.body.email,
        google_id: req.body.sub,
        image: req.body.picture,
        role: "user",
        email_verify: req.body.email_verified,
        password: "",
      };
      let newdata = await Users.create(newData, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          let payload = {
            name: data.name,
            email: data.email,
            role: data.role,
            image: data.image,
          };
          console.log(payload);
          let secretKey = process.env.SECRET_KEY;
          let token = jwt.sign(payload, secretKey, {
            expiresIn: 15,
          });
          const refreshToken = jwt.sign(payload, process.env.REFESTOKEN, {
            expiresIn: 300,
          });
          const response = {
            token: token,
            refreshToken: refreshToken,
          };
          return res
            .status(200)
            .json({ message: "Đăng nhập thành công !", data: response });
        }
      });
    }
  }
}

export default new AuthController();
