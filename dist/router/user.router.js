"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersRouter = express_1.default.Router();
const validation_1 = require("../middleware/validation");
const user_controller_1 = require("../controllers/user.controller");
usersRouter.post("/login", (req, res, next) => {
    user_controller_1.UserController.login(req, res).catch((err) => {
        next(err);
    });
});
usersRouter.post("/register", validation_1.validateUserSignUp, validation_1.userValidation, (req, res, next) => {
    user_controller_1.UserController.register(req, res).catch((err) => {
        next(err);
    });
});
usersRouter.post("/verify", (req, res, next) => {
    user_controller_1.UserController.verify(req, res).catch((err) => {
        next(err);
    });
});
usersRouter.post('/broad', (req, res) => {
});
exports.default = usersRouter;
//# sourceMappingURL=user.router.js.map