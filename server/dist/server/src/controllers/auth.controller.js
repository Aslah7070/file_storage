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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
class AuthController {
    constructor(_authService) {
        this._authService = _authService;
    }
    signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this._authService.register(req.body);
                if (result.success) {
                    const token = result.token;
                    const refreshToken = result.refreshToken;
                    res.cookie("token", token, {
                        httpOnly: true,
                        secure: true,
                        maxAge: 7 * 24 * 60 * 60 * 1000,
                        sameSite: "none",
                    });
                    res.cookie("refreshToken", refreshToken, {
                        httpOnly: true,
                        secure: true,
                        maxAge: 7 * 24 * 60 * 60 * 1000,
                        sameSite: "none",
                    });
                }
                res.status(result.statuscode).json({
                    success: result.success,
                    message: result.message,
                    user: result.user,
                    token: result.token,
                    refreshtoken: result.refreshToken,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this._authService.login(req.body);
                if (result.success) {
                    const token = result.token;
                    const refreshToken = result.refreshToken;
                    res.cookie("token", token, {
                        httpOnly: true,
                        secure: true,
                        maxAge: 7 * 24 * 60 * 60 * 1000,
                        sameSite: "none",
                    });
                    res.cookie("refreshToken", refreshToken, {
                        httpOnly: true,
                        secure: true,
                        maxAge: 7 * 24 * 60 * 60 * 1000,
                        sameSite: "none",
                    });
                }
                res
                    .status(result.statuscode)
                    .json({ success: result.success, message: result.message, result });
            }
            catch (error) {
                next(error);
                console.log(error);
            }
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                const result = yield this._authService.logout(userId);
                res.clearCookie("accessToken", {
                    httpOnly: true,
                    sameSite: "strict",
                    secure: process.env.NODE_ENV === "production", // true in prod
                });
                res.clearCookie("refreshToken", {
                    httpOnly: true,
                    sameSite: "strict",
                    secure: process.env.NODE_ENV === "production",
                });
                res
                    .status(result.statuscode)
                    .json({ suceess: result.success, message: result.message, result });
            }
            catch (error) {
                next(error);
                console.log(error);
            }
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map