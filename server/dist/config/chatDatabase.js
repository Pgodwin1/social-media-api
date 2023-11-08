"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('connectify', '', '', {
    storage: './connectify.sqlite',
    dialect: 'sqlite',
    logging: false
});
exports.default = db;
//# sourceMappingURL=chatDatabase.js.map