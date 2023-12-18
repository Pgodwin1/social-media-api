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
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../model/userModel"));
const jwtsecret = process.env.JWT_SECRET;
function auth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authorisation = req.headers.authorization;
        if (!authorisation)
            return res.status(401).json({ msg: 'Kindly sign in' });
        const token = authorisation.split(' ')[1];
        let verified = jsonwebtoken_1.default.verify(token, jwtsecret);
        if (!verified) {
            return res.status(401).json({ msg: 'You are not authorised' });
        }
        const { id } = verified;
        const user = yield userModel_1.default.findOne({ where: { id } });
        if (!user) {
            return res.status(401).json({ msg: 'Kindly sign in' });
        }
        req.user = verified;
        next();
    });
}
exports.auth = auth;
;
//# sourceMappingURL=authenticate.js.map