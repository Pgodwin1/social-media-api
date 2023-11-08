"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.timelinePost = exports.getPost = exports.likePost = exports.deletePost = exports.createPost = void 0;
const utils_1 = require("../utilities/utils");
const postModel_1 = require("../model/postModel");
const uuid_1 = require("uuid");
const userModel_1 = require("../model/userModel");
const jwt_secret = process.env.JWT_SECRET;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v4)();
        console.log(req.user.id);
        const userId = req.user.id;
        const validateResult = utils_1.createPostSchema.validate(req.body, utils_1.option);
        if (validateResult.error) {
            return res
                .status(400)
                .json({ msg: validateResult.error.details[0].message });
        }
        const postRecord = yield postModel_1.PostInstance.create(Object.assign(Object.assign({ id }, req.body), { userId: userId }));
        return res
            .status(201)
            .json({ msg: "post created successfully", postRecord });
    }
    catch (err) {
        res.status(500).json({ msg: "cannot create post", err });
    }
});
exports.createPost = createPost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const postRecord = yield postModel_1.PostInstance.findOne({
            where: { id },
        });
        if (!postRecord) {
            return res.status(404).json({
                error: "Post not found",
            });
        }
        const deletePost = yield postRecord.destroy();
        return res.status(200).json({
            msg: "Post deleted successfully",
            deletePost,
        });
    }
    catch (err) {
        return res.status(500).json({
            error: "server error",
        });
    }
});
exports.deletePost = deletePost;
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(typeof id);
        const user = (yield postModel_1.PostInstance.findOne({
            where: { id },
        }));
        const currentUser = yield userModel_1.UserInstance.findOne({
            where: { id: req.user.id },
        });
        if (Array.isArray(user.likes)) {
            if (!user.likes.includes(req.body.userId)) {
                let likes = user.likes;
                likes.push(req.body.userId);
                user.likes = likes;
                const count = user.likesCount;
                user.likesCount = count + 1;
                likes.push(currentUser.id);
                yield postModel_1.PostInstance.update({
                    likes,
                }, {
                    where: { id },
                });
            }
            return res.status(200).json({
                msg: "Post liked successfully",
                user,
            });
        }
        else if (!Array.isArray(user.likes)) {
            let likes = [];
            likes.pop;
            user.likes = likes;
            let count = user.likesCount;
            user.likesCount = count - 1;
            likes.push(currentUser.id);
            yield postModel_1.PostInstance.update({
                likes,
            }, {
                where: { id },
            });
            return res.status(200).json({
                msg: "Post liked successfully",
                user,
            });
        }
        else {
            res.status(403).json("You already liked this post");
        }
    }
    catch (err) {
        return res.status(500).json({
            error: "server error",
        });
    }
});
exports.likePost = likePost;
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const post = yield postModel_1.PostInstance.findOne({
            where: { id },
        });
        if (!post) {
            return res.status(404).json({
                error: "Post not found",
            });
        }
        return res.status(200).json({
            msg: "Post retrieved successfully",
            post,
        });
    }
    catch (err) {
        return res.status(500).json({
            error: "server error",
        });
    }
});
exports.getPost = getPost;
const timelinePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentUser = yield userModel_1.UserInstance.findOne({
            where: { id: req.body.userId },
        });
        console.log(currentUser);
        const userPosts = yield postModel_1.PostInstance.findAll({
            where: { userId: currentUser.id },
        });
        console.log(userPosts);
        const friendPosts = yield Promise.all(currentUser.following.map((friendId) => {
            return postModel_1.PostInstance.findAll({
                where: { userId: friendId },
            });
        }));
        console.log(friendPosts);
        res.json(userPosts.concat(...friendPosts));
    }
    catch (err) {
        return res.status(500).json({
            error: "server error",
        });
    }
});
exports.timelinePost = timelinePost;
//# sourceMappingURL=postController.js.map