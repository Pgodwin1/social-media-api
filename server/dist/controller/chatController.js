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
exports.updateInfo = void 0;
const chatModel_1 = require("../model/chatModel");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const utils_1 = require("../utilities/utils");
const updateInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = yield bcryptjs_1.default.genSalt(10);
                req.body.password = yield bcryptjs_1.default.hash(req.body.password, salt);
            }
            catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            const validate = utils_1.updateInfoSchema.validate(req.body, utils_1.option);
            if (validate.error) {
                return res.status(400).json({
                    error: validate.error.details[0].message
                });
            }
            const info = yield chatModel_1.InfoInstance.findOne({ where: { id: req.params.id } });
            if (!info)
                return res.status(404).json({
                    error: "user not found"
                });
            const updatedInfo = yield info.update(req.body);
            return res.status(200).json({
                msg: "info updated successfully",
                updatedInfo
            });
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
    else {
        return res.status(403).json("You can update only your account!");
    }
});
exports.updateInfo = updateInfo;
//# sourceMappingURL=chatController.js.map