"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authLogin = (req, res, next) => {
    let authorization = localStorage.getItem('token');
    if (authorization) {
        let accessToken = authorization;
        if (!accessToken) {
            res.status(401).json({ message: "Access token is required1." });
        }
        else {
            let newdata = JSON.parse(accessToken);
            jsonwebtoken_1.default.verify(newdata.token, process.env.SECRET_KEY, (err, data) => {
                if (newdata.role === "admin") {
                    if (err) {
                        res.status(401).json({ message: "Access token is required2." });
                    }
                    else {
                        req.decoded = data;
                        next();
                    }
                }
                else {
                    res.render('product/login/404');
                }
            });
        }
    }
    else {
        res.status(401).json({ message: "Access token is required3." });
    }
};
exports.authLogin = authLogin;
//# sourceMappingURL=auth.middleware.js.map