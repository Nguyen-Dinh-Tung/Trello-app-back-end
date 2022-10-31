"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Users_1 = require("./../models/entity/Users");
const data_source_1 = require("../data-source");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mailer_1 = require("../utils/mailer");
class UserController {
    constructor() {
        this.login = async (req, res) => {
            try {
                let data = {
                    email: req.body.email,
                    password: req.body.password,
                };
                let user = await this.UserRepo.findOne({ email: data.email });
                console.log("🚀 ~ file: user.controller.ts ~ line 44 ~ UserController ~ login ~ user", user);
                if (!user) {
                    return res
                        .status(200)
                        .json({ message: "Đăng nhập thất bại! Vui lòng thử lại !" });
                }
                else if (user.email_verify === "false") {
                    return res.status(200).json({
                        message: "Tài khoản chưa được xác thực. Vui lòng kiểm tra email !",
                    });
                }
                else {
                    let comparePassword = await bcrypt_1.default.compare(data.password, user.password);
                    if (!comparePassword) {
                        return res
                            .status(200)
                            .json({ message: "Sai mật khẩu ! Vui lòng thử lại !" });
                    }
                    else {
                        let payload = {
                            username: user.username,
                            password: user.password,
                            role: user.role,
                        };
                        let secretKey = process.env.SECRET_KEY;
                        let token = jsonwebtoken_1.default.sign(payload, secretKey, {
                            expiresIn: 36000000,
                        });
                        const response = {
                            token: token,
                        };
                        return res
                            .status(200)
                            .json({ message: "Đăng nhập thành công !", data: response });
                    }
                }
            }
            catch (e) {
                console.log(e.message);
            }
        };
        this.register = async (req, res) => {
            try {
                let user = req.body;
                console.log("🚀 ~ file: user.controller.ts ~ line 74 ~ UserController ~ register= ~ user", user);
                let Email = user.email;
                let userByEmail = await this.UserRepo.find({
                    where: {
                        email: Email,
                    },
                });
                console.log("🚀 ~ file: user.controller.ts ~ line 77 ~ UserController ~ register= ~ userByEmail", userByEmail);
                let userByUsername = await this.UserRepo.find({
                    where: {
                        name: user.name,
                    },
                });
                console.log("🚀 ~ file: user.controller.ts ~ line 81 ~ UserController ~ register= ~ userByUsername", userByUsername);
                if (userByUsername) {
                    return res.json({ message: "Username đã tồn tại !" });
                }
                else if (userByEmail) {
                    return res.json({ message: "Email đã tồn tại !" });
                }
                else {
                    user.password = await bcrypt_1.default.hash(user.password, parseInt(process.env.BCRYPT_SALT_ROUND));
                    let data = {
                        name: user.username,
                        email: user.email,
                        password: user.password,
                        email_verify: false,
                    };
                    let newUser = await this.UserRepo.create(data, (err, user) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            bcrypt_1.default
                                .hash(user.email, parseInt(process.env.BCRYPT_SALT_ROUND))
                                .then((hashedEmail) => {
                                console.log(`${process.env.APP_URL}/verify?email=${user.email}&token=${hashedEmail}`);
                                (0, mailer_1.senMail)(user.email, "Verify Email", `<div style="padding: 10px; background-color: blue">
              <div style="padding: 10px; background-color: white;">
                  <h4 style="color: #ee1414; width: 100%; text-align: center; font-size: 20px;">Click here</h4>
                  <div style="color: black; font-size: 35px; width: 100%; text-align: center; height: 50px;"><a href="${process.env.APP_URL}/register/verify?email=${user.email}&token=${hashedEmail}"> Verify </a></div>
              </div>
              </div> `);
                                return res.status(200).json({
                                    email: user.email,
                                    token: hashedEmail,
                                });
                            });
                        }
                    });
                }
            }
            catch (e) {
                console.log(e.sql);
            }
        };
        this.verify = async (req, res) => {
            try {
                bcrypt_1.default.compare(req.body.email, req.body.token, (err, result) => {
                    if (result === true) {
                        this.UserRepo.findOneAndUpdate({ email: `${req.body.email}` }, { email_verify: true }, function (err, docs) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log(1);
                                return res.status(200).json({ message: "verify thanh cong!" });
                            }
                        });
                    }
                    else {
                        return res.status(200).json({ message: "404" });
                    }
                });
            }
            catch (e) {
                console.log(e.message);
            }
        };
        data_source_1.AppDataSource.initialize().then(async (connection) => {
            this.UserRepo = connection.getRepository(Users_1.User);
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=user.controller.js.map