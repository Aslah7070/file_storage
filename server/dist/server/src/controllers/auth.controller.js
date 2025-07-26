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
const status_constants_1 = require("../constants/status.constants");
class AuthController {
    constructor(_authService) {
        this._authService = _authService;
    }
    signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this._authService.register(req.body);
                res.status(result.statuscode).json({ success: result.success, message: result.message });
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
                res.status(status_constants_1.HttpStatus.OK).json({ success: true, message: "login successfull", result });
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