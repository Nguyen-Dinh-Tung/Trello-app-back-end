"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./data-source");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_router_1 = __importDefault(require("./router/user.router"));
const PORT = 8080;
data_source_1.AppDataSource.initialize()
    .then(async (connection) => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use("/", user_router_1.default);
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:` + PORT);
    });
})
    .catch((err) => {
    console.log(err.message);
});
//# sourceMappingURL=index.js.map