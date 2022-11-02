"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchemas = new mongoose_1.default.Schema({
    name: String,
    email: String,
    role: String,
    email_verify: String,
    google_id: String,
    image: String,
    password: String,
});
const Users = mongoose_1.default.model("Users", userSchemas);
exports.default = Users;
//# sourceMappingURL=user.schema.js.map