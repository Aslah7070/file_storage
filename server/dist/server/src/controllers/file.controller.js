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
exports.FileController = void 0;
const status_constants_1 = require("../constants/status.constants");
class FileController {
    constructor(_fileService) {
        this._fileService = _fileService;
    }
    uploadFile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const file = req.file;
                if (!userId) {
                    res.status(401).json({ message: "Unauthorized" });
                    return;
                }
                if (!file) {
                    res.status(400).json({ message: "No file uploaded" });
                    return;
                }
                const result = yield this._fileService.uploadFile(userId, [file]);
                res.status(result.statuscode).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteFile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileId = req.params.id;
            try {
                const result = yield this._fileService.deleteFile(fileId);
                if (!result.success) {
                    res.status(result.statuscode).json({
                        success: false,
                        message: result.message,
                    });
                    return;
                }
                res.status(result.statuscode).json({
                    success: result.success,
                    message: result.message
                });
            }
            catch (err) {
                res.status(status_constants_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    message: 'Internal server error',
                    error: err,
                });
            }
        });
    }
    findFilesByContentType(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                res.status(status_constants_1.HttpStatus.UNAUTHORIZED).json({ success: false, message: "UnAuthorised" });
                return;
            }
            const contentType = req.query.contentType;
            console.log(contentType, "content");
            try {
                const result = yield this._fileService.findFilesByContentType(userId, contentType);
                if (!result.success) {
                    res.status(result.statuscode).json({
                        success: false,
                        message: result.message,
                    });
                    return;
                }
                res.status(result.statuscode).json({
                    success: result.success,
                    message: result.message,
                    result: result
                });
            }
            catch (err) {
                res.status(status_constants_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    message: 'Internal server error',
                    error: err,
                });
            }
        });
    }
}
exports.FileController = FileController;
//# sourceMappingURL=file.controller.js.map