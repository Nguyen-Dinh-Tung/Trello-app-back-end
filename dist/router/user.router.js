"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthRouter = express_1.default.Router();
const validation_1 = require("../middleware/validation");
const user_controller_1 = require("../controllers/user.controller");
AuthRouter.post("/login", (req, res, next) => {
    user_controller_1.UserController.login(req, res).catch((err) => {
        next(err);
    });
});
AuthRouter.post("/register", validation_1.validateUserSignUp, validation_1.userValidation, (req, res, next) => {
    user_controller_1.UserController.register(req, res).catch((err) => {
        next(err);
    });
});
AuthRouter.post("/verify", (req, res, next) => {
    user_controller_1.UserController.verify(req, res).catch((err) => {
        next(err);
    });
});
exports.default = AuthRouter;
//# sourceMappingURL=user.router.js.map