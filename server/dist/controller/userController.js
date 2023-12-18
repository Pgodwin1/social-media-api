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
exports.login = exports.Register = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const utils_1 = require("../utilities/utils");
const jwt_secret = process.env.JWT_SECRET;
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, username, gender, password, confirm_password } = req.body;
        const validate = utils_1.RegisterUserSchema.validate(req.body, utils_1.option);
        if (validate.error) {
            return res.status(400).json({
                Error: validate.error.details[0].message
            });
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const passwordhash = yield bcryptjs_1.default.hash(req.body.password, salt);
        console.log(passwordhash);
        const userExist = yield userModel_1.default.findOne({ email: email });
        if (!userExist) {
            const user = yield userModel_1.default.create({
                email,
                username,
                gender,
                password: passwordhash,
            });
            console.log(userExist);
            return res.status(201).json({ message: "User created successfully", user });
        }
        return res.status(409).json({ message: "User already exist" });
    }
    catch (err) {
        console.log(err);
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
        const userExist = yield userModel_1.default.findOne({
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
//# sourceMappingURL=userController.js.map