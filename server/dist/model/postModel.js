"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostInstance = void 0;
const sequelize_1 = require("sequelize");
const chatDatabase_1 = __importDefault(require("../config/chatDatabase"));
class PostInstance extends sequelize_1.Model {
}
exports.PostInstance = PostInstance;
PostInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
    },
    desc: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    img: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    userId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        primaryKey: true,
    },
    likes: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.JSON),
        allowNull: true,
    },
}, {
    sequelize: chatDatabase_1.default,
    tableName: "posts",
    timestamps: true,
});
//# sourceMappingURL=postModel.js.map