"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const checkToken_1 = require("../middleware/checkToken");
const user_controller_1 = require("../controllers/user.controller");
const express_1 = __importDefault(require("express"));
const MmRouter = express_1.default.Router();
MmRouter.use(checkToken_1.checkToken);
MmRouter.post("/test", (req, res, next) => {
    user_controller_1.MmController.test(req, res).catch((err) => {
        next(err);
    });
});
exports.default = MmRouter;
//# sourceMappingURL=user.router.js.map