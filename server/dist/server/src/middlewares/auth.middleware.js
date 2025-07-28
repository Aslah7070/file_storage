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
exports.userAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_constant_1 = require("../constants/response.constant");
const status_constants_1 = require("../constants/status.constants");
const env_configs_1 = require("../configs/env.configs");
const AuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
        if (!token) {
            const refreshToken = (_b = req.cookies) === null || _b === void 0 ? void 0 : _b.refreshmentToken;
            if (!refreshToken) {
                throw new Error(response_constant_1.HttpResponse.TOKEN_EXPIRED);
            }
            const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_SECRET);
            const newToken = jsonwebtoken_1.default.sign({ id: decoded.id, email: decoded.email, role: decoded.role }, process.env.JWT_SECRET, { expiresIn: "1m" });
            res.cookie("accessToken", newToken, {
                httpOnly: true,
                secure: true,
                maxAge: 1 * 60 * 1000,
                sameSite: "none",
            });
            req.user = decoded;
            return next();
        }
        const secretKey = env_configs_1.env.JWT_ACCESS_SECRET;
        if (!secretKey) {
            res
                .status(status_constants_1.HttpStatus.NOT_FOUND)
                .json({ success: false, message: response_constant_1.HttpResponse.UNEXPECTED_KEY_FOUND });
            return;
        }
        yield jsonwebtoken_1.default.verify(token, secretKey, (error, user) => {
            var _a;
            if (error) {
                const refreshToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken;
                if (!refreshToken) {
                    res
                        .status(status_constants_1.HttpStatus.UNAUTHORIZED)
                        .json({ success: false, message: response_constant_1.HttpResponse.TOKEN_EXPIRED });
                    return;
                }
                const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_SECRET);
                const newToken = jsonwebtoken_1.default.sign({ id: decoded.id, email: decoded.email, role: decoded.role }, process.env.JWT_SECRET);
                res.cookie("accessToken", newToken, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 1 * 60 * 1000,
                    sameSite: "none",
                });
                req.user = decoded;
                return next();
            }
            req.user = user;
            next();
        });
    }
    catch (error) {
        res.status(500).json({ status: false, message: "Internallll server error" });
        return;
    }
});
const userAuth = (req, res, next) => {
    AuthMiddleware(req, res, () => {
        if (req.user) {
            console.log("user", req.user);
            return next();
        }
        else {
            console.log(req.user);
            res
                .status(status_constants_1.HttpStatus.FORBIDDEN)
                .json({ success: false, message: response_constant_1.HttpResponse.UNAUTHORIZED });
            return;
        }
    });
};
exports.userAuth = userAuth;
//# sourceMappingURL=auth.middleware.js.map