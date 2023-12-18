import express from "express";
import {
  Register,
  login,
  // deleteInfo,
  // followUser,
  // getUser,
  // updateInfo,
} from "../controller/userController";
import { auth } from "../middleware/authenticate";

const router = express.Router();

/* GET users listing. */
router.post("/register", Register);
router.post("/login", login);
// router.patch("/update-info/:id", auth, updateInfo);
// router.delete("/delete-info/:id", auth, deleteInfo);
// router.get("/get-info/:id", auth, getUser);
// router.post("/follow-user/:id", auth, followUser);

export default router;
