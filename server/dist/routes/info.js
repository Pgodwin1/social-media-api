"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const infoController_1 = require("../controller/infoController");
const router = express_1.default.Router();
router.patch('/', infoController_1.updateInfo);
exports.default = router;
//# sourceMappingURL=info.js.map