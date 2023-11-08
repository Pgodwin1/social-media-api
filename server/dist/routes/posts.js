"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controller/postController");
const authenticate_1 = require("../middleware/authenticate");
const router = express_1.default.Router();
router.post("/create", authenticate_1.auth, postController_1.createPost);
router.delete("/delete-post/:id", authenticate_1.auth, postController_1.deletePost);
router.put("/like-post/:id", authenticate_1.auth, postController_1.likePost);
router.get("/get-post/:id", authenticate_1.auth, postController_1.getPost);
router.get("/timeline-post", authenticate_1.auth, postController_1.timelinePost);
exports.default = router;
//# sourceMappingURL=posts.js.map