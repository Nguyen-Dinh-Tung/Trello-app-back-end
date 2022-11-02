"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRouter = express_1.default.Router();
const validation_1 = require("../middleware/validation");
const Broad_schema_1 = __importDefault(require("../models/schemas/Broad.schema"));
const auth_controller_1 = require("../controllers/auth.controller");
authRouter.post("/login", (req, res, next) => {
    auth_controller_1.AuthController.login(req, res).catch((err) => {
        next(err);
    });
});
authRouter.post("/register", validation_1.validateUserSignUp, validation_1.userValidation, (req, res, next) => {
    auth_controller_1.AuthController.register(req, res).catch((err) => {
        next(err);
    });
});
authRouter.post("/verify", (req, res, next) => {
    auth_controller_1.AuthController.verify(req, res).catch((err) => {
        next(err);
    });
});
authRouter.post("/token", (req, res, next) => {
    auth_controller_1.AuthController.token(req, res).catch((err) => {
        next(err);
    });
});
authRouter.post("/google", (req, res, next) => {
    auth_controller_1.AuthController.registerGoogle(req, res).catch((err) => {
        next(err);
    });
});
authRouter.post("/broad", async (req, res) => {
    let title = req.body.title;
    let mode = req.body.mode;
    if (title && mode) {
        const newBroad = await Broad_schema_1.default.create({ title: title, mode: mode });
        if (newBroad) {
            res.status(200).json({
                message: "Create success",
                id: newBroad._id,
            });
        }
        else {
            res.status(200).json({
                message: "Create fail",
            });
        }
        res.status(200).json({
            message: "Create fail because  not valid",
        });
    }
});
exports.default = authRouter;
//# sourceMappingURL=auth.router.js.map