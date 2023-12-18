import mongoose from "mongoose";
// import { PostInstance } from "./postModel";

const userSchema = new mongoose.Schema({
    id: {
      type: String,
      allowNull: false,
      primaryKey: true,
    },
    gender: {
      type: String,
      allowNull: true,
      defaultValue: "",
    },
    followerCount: {
      type: Number,
      defaultValue: 0,
    },
    followingCount: {
      type: String,
      defaultValue: 0,
    },
    username: {
      type: String,
      allowNull: false,
      unique: true,
    },
    email: {
      type: String,
      allowNull: false,
      unique: true,
    },
    password: {
      type: String,
      allowNull: false,
    },
    profilePicture: {
      type: String,
      allowNull: true,
      defaultValue: "",
    },
    coverPicture: {
      type: String,
      allowNull: true,
      defaultValue: "",
    },
    followers: {
      type: [String],
      allowNull: true,
    },
    following: {
      type: [String],
      allowNull: true,
    },
    isAdmin: {
      type: Boolean,
      allowNull: false,
      defaultValue: false,
    },
    desc: {
      type: String,
      allowNull: true,
    },
    city: {
      type: String,
      allowNull: true,
    },
    From: {
      type: String,
      allowNull: true,
    },
    relationship: {
      type: String,
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;
