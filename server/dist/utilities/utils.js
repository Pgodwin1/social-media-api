"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostSchema = exports.updateInfoSchema = exports.loginUserSchema = exports.option = exports.RegisterUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.RegisterUserSchema = joi_1.default.object().keys({
    username: joi_1.default.string().min(3).max(30).required(),
    email: joi_1.default.string().trim().required(),
    password: joi_1.default.string().min(3).regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    profilePicture: joi_1.default.string(),
    coverPicture: joi_1.default.string(),
    followers: joi_1.default.array().items(joi_1.default.string().trim()),
    followings: joi_1.default.array().items(joi_1.default.string().trim()),
    isAdmin: joi_1.default.string(),
    confirm_password: joi_1.default.any().equal(joi_1.default.ref('password')).required().label('Confirm password').messages({ 'any.only': '{#label} does not match' })
});
exports.option = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ''
        }
    }
};
exports.loginUserSchema = joi_1.default.object().keys({
    username: joi_1.default.string().min(3).max(30),
    email: joi_1.default.string().trim().required(),
    password: joi_1.default.string().min(3).regex(/^[a-zA-Z0-9]{3,30}$/).required(),
});
exports.updateInfoSchema = joi_1.default.object().keys({
    username: joi_1.default.string().min(3).max(30),
    email: joi_1.default.string().trim(),
    password: joi_1.default.string().min(3).regex(/^[a-zA-Z0-9]{3,30}$/),
    profilePicture: joi_1.default.string(),
    coverPicture: joi_1.default.string(),
    followers: joi_1.default.array().items(joi_1.default.string().trim()),
    followings: joi_1.default.array().items(joi_1.default.string().trim()),
    isAdmin: joi_1.default.string(),
    desc: joi_1.default.string(),
    city: joi_1.default.string(),
    from: joi_1.default.string(),
    relationship: joi_1.default.number(),
});
exports.createPostSchema = joi_1.default.object().keys({
    desc: joi_1.default.string().max(500),
    img: joi_1.default.string().trim(),
    likes: joi_1.default.array().items(joi_1.default.string().trim()),
});
//# sourceMappingURL=utils.js.map