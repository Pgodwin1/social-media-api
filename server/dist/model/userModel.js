"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInstance = void 0;
const sequelize_1 = require("sequelize");
const chatDatabase_1 = __importDefault(require("../config/chatDatabase"));
const postModel_1 = require("./postModel");
class UserInstance extends sequelize_1.Model {
}
exports.UserInstance = UserInstance;
UserInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    followerCount: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    followingCount: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    profilePicture: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
    },
    coverPicture: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
    },
    followers: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.TEXT),
        allowNull: true,
    },
    following: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.TEXT),
        allowNull: true,
    },
    isAdmin: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    desc: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    From: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    relationship: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
}, {
    sequelize: chatDatabase_1.default,
    tableName: "users",
    timestamps: true,
});
UserInstance.hasMany(postModel_1.PostInstance, { foreignKey: "userId", as: "posts" });
postModel_1.PostInstance.belongsTo(UserInstance, { foreignKey: "userId", as: "users" });
//# sourceMappingURL=userModel.js.map