"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize("case6", "root", "123456", {
    host: "localhost",
    dialect: "mysql",
});
db.authenticate()
    .then(() => {
    console.log("Ket noi thanh cong !");
})
    .catch((e) => {
    console.log(e.message);
});
module.exports = db;
//# sourceMappingURL=database.js.map