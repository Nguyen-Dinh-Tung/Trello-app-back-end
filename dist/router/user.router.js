"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthRouter = express_1.default.Router();
const validation_1 = require("../middleware/validation");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
AuthRouter.post("/login", user_controller_1.default.login);
AuthRouter.post("/register", validation_1.validateUserSignUp, validation_1.userValidation, user_controller_1.default.register);
AuthRouter.post("/verify", user_controller_1.default.verify);
exports.default = AuthRouter;
//# sourceMappingURL=user.router.js.map