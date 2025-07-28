"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const auth_service_1 = require("../services/implementation/auth.service");
const express_1 = __importDefault(require("express"));
const authService = new auth_service_1.AuthService();
// inject service into controller
const authController = new auth_controller_1.AuthController(authService);
const auth = express_1.default.Router();
exports.auth = auth;
auth
    .post("/signup", authController.signup.bind(authController))
    .post("/login", authController.login.bind(authController))
    .post("/logout", auth_middleware_1.userAuth, authController.logout.bind(authController));
//# sourceMappingURL=auth.routes.js.map