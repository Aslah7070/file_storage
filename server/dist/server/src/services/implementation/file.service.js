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
exports.FileService = void 0;
const env_configs_1 = require("../../configs/env.configs");
const file_models_1 = __importDefault(require("../../models/file.models"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const status_constants_1 = require("../../constants/status.constants");
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: env_configs_1.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env_configs_1.env.AWS_SECRET_ACCESS_KEY,
    region: env_configs_1.env.AWS_REGION,
});
class FileService {
    uploadFile(userId, files) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!files || files.length === 0) {
                return {
                    statuscode: 400,
                    message: "No files uploaded",
                    success: false,
                };
            }
            const savedFiles = yield Promise.all(files.map((file) => __awaiter(this, void 0, void 0, function* () {
                const newFile = new file_models_1.default({
                    filename: file.key,
                    originalName: file.originalname,
                    size: file.size,
                    url: file.location,
                    contentType: file.mimetype,
                    user: userId,
                });
                return yield newFile.save();
            })));
            return {
                statuscode: 200,
                message: "Files uploaded and saved successfully",
                success: true,
                data: savedFiles,
            };
        });
    }
    findFilesByContentType(userId, contentType) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(typeof contentType);
            console.log(contentType);
            const files = yield file_models_1.default.find({
                user: userId,
                contentType: { $regex: contentType, $options: "i" },
            });
            console.log("files", files);
            return {
                statuscode: 200,
                message: `Files with contentType: ${contentType}`,
                success: true,
                data: files,
            };
        });
    }
    deleteFile(fileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const bucketName = env_configs_1.env.S3_BUCKET_NAME;
            console.log("fdfd", bucketName);
            const file = yield file_models_1.default.findById(fileId);
            if (!bucketName) {
                return {
                    statuscode: status_constants_1.HttpStatus.BAD_REQUEST,
                    message: "Bucket name is not defined",
                    success: false
                };
            }
            if (!file) {
                return {
                    statuscode: status_constants_1.HttpStatus.NOT_FOUND,
                    message: 'File not found',
                    success: false,
                };
            }
            // Extract the S3 key from the URL
            const url = new URL(file.url);
            const key = url.pathname.slice(1);
            console.log("key", key);
            try {
                yield s3
                    .deleteObject({
                    Bucket: bucketName,
                    Key: key,
                })
                    .promise();
            }
            catch (err) {
                console.error("❌ S3 delete error:", err);
                return {
                    statuscode: status_constants_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Failed to delete file from S3',
                    success: false,
                    error: err.message || JSON.stringify(err),
                };
            }
            // Delete from DB
            yield file_models_1.default.findByIdAndDelete(fileId);
            return {
                statuscode: 200,
                message: 'File deleted successfully',
                success: true,
            };
        });
    }
}
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map