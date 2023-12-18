import express from "express";
// import { createPost, deletePost, getPost, likePost, timelinePost } from "../controller/postController";
import { auth } from "../middleware/authenticate";
const router = express.Router();

/* GET home page. */
// router.post("/create", auth, createPost);
// router.delete("/delete-post/:id", auth, deletePost);
// router.put("/like-post/:id", auth, likePost);
// router.get("/get-post/:id", auth, getPost);
// router.get("/timeline-post", auth, timelinePost);

export default router;
