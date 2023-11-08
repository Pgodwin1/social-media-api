import { DataTypes, Model } from "sequelize";
import db from "../config/chatDatabase";
// import { UserInstance } from "./userModel";

export interface postAttributes {
  id: string;
  desc: string;
  img: string;
  likes: string[];
  userId: string;
}

export class PostInstance extends Model<postAttributes> {}

PostInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
    },
    likes: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true,
    //   defaultValue: [],
    },
  },
  {
    sequelize: db,
    tableName: "posts",
    timestamps: true,
  }
);

// PostInstance.hasMany(PostInstance, { foreignKey: "userId", as: "posts" });
// PostInstance.belongsTo(UserInstance, { foreignKey: "userId", as: "users" });
