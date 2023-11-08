"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const authenticate_1 = require("../middleware/authenticate");
const router = express_1.default.Router();
router.post("/register", userController_1.Register);
router.post("/login", userController_1.login);
router.patch("/update-info/:id", authenticate_1.auth, userController_1.updateInfo);
router.delete("/delete-info/:id", authenticate_1.auth, userController_1.deleteInfo);
router.get("/get-info/:id", authenticate_1.auth, userController_1.getUser);
router.post("/follow-user/:id", authenticate_1.auth, userController_1.followUser);
exports.default = router;
//# sourceMappingURL=users.js.map