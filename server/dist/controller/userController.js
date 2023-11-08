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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.followUser = exports.getUser = exports.deleteInfo = exports.updateInfo = exports.login = exports.Register = void 0;
const userModel_1 = require("../model/userModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const uuid_1 = require("uuid");
const utils_1 = require("../utilities/utils");
const jwt_secret = process.env.JWT_SECRET;
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uuid = (0, uuid_1.v4)();
        const validate = utils_1.RegisterUserSchema.validate(req.body, utils_1.option);
        if (validate.error) {
            return res.status(400).json({
                Error: validate.error.details[0].message
            });
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const passwordhash = yield bcryptjs_1.default.hash(req.body.password, salt);
        const userExist = yield userModel_1.UserInstance.findOne({ where: { email: req.body.email } });
        if (!userExist) {
            const user = yield userModel_1.UserInstance.create(Object.assign(Object.assign({ id: uuid }, req.body), { password: passwordhash }));
            console.log(req);
            return res.status(201).json({ message: "User created successfully", user });
        }
        return res.status(409).json({ message: "User already exist" });
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.Register = Register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const validate = utils_1.loginUserSchema.validate(req.body, utils_1.option);
        if (validate.error) {
            return res.status(400).json({
                error: validate.error.details[0].message
            });
        }
        const userExist = yield userModel_1.UserInstance.findOne({
            where: { email: email }
        });
        if (!userExist) {
            return res.status(404).json({ message: "User not found" });
        }
        const { id } = userExist;
        const token = jsonwebtoken_1.default.sign({ id }, jwt_secret, { expiresIn: "1d" });
        const passwordMatch = yield bcryptjs_1.default.compare(password, userExist.password);
        if (passwordMatch) {
            return res.status(200).json({
                msg: "login successful",
                user: userExist,
                token
            });
        }
        return res.status(401).json({
            error: "Invalid credentials"
        });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.login = login;
const updateInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validate = utils_1.updateInfoSchema.validate(req.body, utils_1.option);
        if (validate.error) {
            return res.status(400).json({
                error: validate.error.details[0].message,
            });
        }
        if (req.body.password) {
            const salt = yield bcryptjs_1.default.genSalt(10);
            req.body.password = yield bcryptjs_1.default.hash(req.body.password, salt);
        }
        const userId = req.params.id;
        const info = yield userModel_1.UserInstance.findOne({ where: { id: userId } });
        if (!info)
            return res.status(404).json({
                error: "user not found",
            });
        const updatedInfo = yield info.update(req.body);
        return res.status(200).json({
            msg: "info updated successfully",
            updatedInfo,
        });
    }
    catch (err) {
        return res.status(500).json({
            error: "server error",
        });
    }
});
exports.updateInfo = updateInfo;
const deleteInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const UserRecord = yield userModel_1.UserInstance.findOne({
            where: { id },
        });
        if (!UserRecord) {
            return res.status(404).json({
                error: "User not found",
            });
        }
        const deleteRecord = yield UserRecord.destroy();
        return res.status(200).json({
            msg: "Account deleted successfully",
            deleteRecord,
        });
    }
    catch (err) {
        return res.status(500).json({
            error: "server error",
        });
    }
});
exports.deleteInfo = deleteInfo;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = (yield userModel_1.UserInstance.findOne({
            where: { id },
        }));
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.password = "";
        user.createdAt = "";
        return res.status(200).json({
            msg: "User found successfully",
            user,
        });
    }
    catch (err) {
        return res.status(500).json({
            error: "server error",
        });
    }
});
exports.getUser = getUser;
const followUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = (yield userModel_1.UserInstance.findOne({
            where: { id },
        }));
        const currentUser = (yield userModel_1.UserInstance.findOne({
            where: { id: req.body.userId },
        }));
        if (Array.isArray(user.followers)) {
            if (!user.followers.includes(req.body.userId)) {
                let following = user.following;
                following.push(req.body.userId);
                user.following = following;
                const count = user.followerCount;
                user.followerCount = count + 1;
                const count1 = user.followingCount;
                user.followingCount = count1 + 1;
                following.push(currentUser.id);
                yield userModel_1.UserInstance.update({
                    following,
                }, {
                    where: { id },
                });
            }
            return res.status(200).json("user has been followed");
        }
        else if (!Array.isArray(user.followers)) {
            let following = [];
            following.push(req.body.userId);
            user.following = following;
            const count = user.followerCount;
            user.followerCount = count + 1;
            const count1 = user.followingCount;
            user.followingCount = count1 + 1;
            following.push(currentUser.id);
            yield userModel_1.UserInstance.update({
                following,
            }, {
                where: { id },
            });
            return res.status(200).json("user has been followed");
        }
        else {
            res.status(403).json("You already follow this user");
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "server error",
        });
    }
});
exports.followUser = followUser;
//# sourceMappingURL=userController.js.map