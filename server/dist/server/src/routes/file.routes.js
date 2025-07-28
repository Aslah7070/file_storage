"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.file = void 0;
const auth_middleware_1 = require("../middlewares/auth.middleware");
const file_middleware_1 = require("../middlewares/file.middleware");
const express_1 = __importDefault(require("express"));
const file_service_1 = require("../services/implementation/file.service");
const file_controller_1 = require("../controllers/file.controller");
const fileService = new file_service_1.FileService();
// inject service into controller
const fileController = new file_controller_1.FileController(fileService);
const file = express_1.default.Router();
exports.file = file;
file
    .post("/upload", auth_middleware_1.userAuth, file_middleware_1.upload.single('image'), fileController.uploadFile.bind(fileController))
    .post("/delete/:id", auth_middleware_1.userAuth, fileController.deleteFile.bind(fileController))
    .get("/find", auth_middleware_1.userAuth, fileController.findFilesByContentType.bind(fileController));
//# sourceMappingURL=file.routes.js.map