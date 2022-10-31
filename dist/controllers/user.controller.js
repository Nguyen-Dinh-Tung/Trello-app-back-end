"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_schema_1 = __importDefault(require("../models/schemas/user.schema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const mailer_1 = require("../utils/mailer");
dotenv.config();
class UserController {
    static async login(req, res) {
        let data = {
            email: req.body.email,
            password: req.body.password,
        };
        let user = await user_schema_1.default.findOne({ email: data.email });
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
                    name: user.name,
                    password: user.password,
                };
                let secretKey = process.env.SECRET_KEY;
                let token = await jsonwebtoken_1.default.sign(payload, secretKey, {
                    expiresIn: 36000000,
                });
                const response = {
                    token: token,
                    user: user,
                };
                return res
                    .status(200)
                    .json({ message: "Đăng nhập thành công !", data: response });
            }
        }
    }
    static async register(req, res) {
        let user = req.body;
        let Email = user.email;
        let userByEmail = await user_schema_1.default.findOne({ email: Email });
        let userByUsername = await user_schema_1.default.findOne({ username: user.username });
        if (userByUsername) {
            return res.json({ message: "Username đã tồn tại !" });
        }
        else if (userByEmail) {
            return res.json({ message: "Email đã tồn tại !" });
        }
        else {
            user.password = await bcrypt_1.default.hash(user.password, parseInt(process.env.BCRYPT_SALT_ROUND));
            let data = {
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                email: user.email,
                password: user.password,
                email_verify: false,
            };
            let newUser = await user_schema_1.default.create(data, (err, user) => {
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
    static async verify(req, res) {
        console.log(req.body);
        bcrypt_1.default.compare(req.body.email, req.body.token, (err, result) => {
            if (result === true) {
                user_schema_1.default.findOneAndUpdate({ email: `${req.body.email}` }, { email_verify: true }, function (err, docs) {
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
}
exports.UserController = UserController;
exports.default = new UserController();
//# sourceMappingURL=user.controller.js.map