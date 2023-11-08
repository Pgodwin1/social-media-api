import { DataTypes, Model } from "sequelize";
import db from "../config/chatDatabase";
import { PostInstance } from "./postModel";

export interface UserAttributes {
  id: string;
  username: string;
  email: string;
  password: string;
  profilePicture: string;
  coverPicture: string;
  followers: string[];
  following: string[];
  followerCount: number;
  followingCount: number;
  isAdmin: boolean;
  desc: string;
  city: string;
  From: string;
  relationship: number;
}

export class UserInstance extends Model<UserAttributes, "id"> {}

UserInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    followerCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    followingCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    coverPicture: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    followers: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
    },
    following: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    From: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    relationship: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    sequelize: db,
    tableName: "users",
    timestamps: true,
  }
);

UserInstance.hasMany(PostInstance, { foreignKey: "userId", as: "posts" });
PostInstance.belongsTo(UserInstance, { foreignKey: "userId", as: "users" });
