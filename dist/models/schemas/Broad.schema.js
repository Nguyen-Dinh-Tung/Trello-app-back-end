"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const broadSchema = new mongoose_1.default.Schema({
    title: String,
    mode: String,
});
const BroadModels = mongoose_1.default.model("Broad", broadSchema);
exports.default = BroadModels;
//# sourceMappingURL=Broad.schema.js.map