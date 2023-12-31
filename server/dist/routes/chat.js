"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatController_1 = require("../controller/chatController");
const router = express_1.default.Router();
router.patch('/update-info/:id', chatController_1.updateInfo);
exports.default = router;
//# sourceMappingURL=chat.js.map