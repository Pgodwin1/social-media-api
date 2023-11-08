"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const posts_1 = __importDefault(require("./routes/posts"));
const users_1 = __importDefault(require("./routes/users"));
const chatDatabase_1 = __importDefault(require("./config/chatDatabase"));
chatDatabase_1.default.sync({ alter: true })
    .then(() => {
    console.log("connectify database is ready to use");
})
    .catch((err) => console.log("Connectify database is not ready to use", err));
const app = (0, express_1.default)();
app.set("views", path_1.default.join(__dirname, "...", "views"));
app.set("view engine", "ejs");
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use("/", (req, res) => {
    return res.json({ msg: "Welcome to Connectify",
        login: "http://localhost:3000/users/login",
        register: "http://localhost:3000/users/register",
        createPost: "http://localhost:3000/posts/create-post",
        getPosts: "http://localhost:3000/posts/get-posts",
        getSinglePost: "http://localhost:3000/posts/get-single-post/:id",
        updatePost: "http://localhost:3000/posts/update-post/:id",
        deletePost: "http://localhost:3000/posts/delete-post/:id",
        followUser: "http://localhost:3000/users/follow-user/:id",
        getUser: "http://localhost:3000/users/get-info/:id",
        updateInfo: "http://localhost:3000/users/update-info/:id",
        deleteInfo: "http://localhost:3000/users/delete-info/:id",
    });
});
app.use("/posts", posts_1.default);
app.use("/users", users_1.default);
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
    res.render("error");
});
exports.default = app;
//# sourceMappingURL=app.js.map