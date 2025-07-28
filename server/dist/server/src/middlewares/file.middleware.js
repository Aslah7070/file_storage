"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const client_s3_1 = require("@aws-sdk/client-s3");
const env_configs_1 = require("../configs/env.configs");
const allowedMimes = [
    // Images
    'image/jpeg',
    'image/png',
    'image/gif',
    // Documents
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'application/zip',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    // Audio
    'audio/mpeg',
    'audio/wav',
    'audio/ogg',
    'audio/webm',
    // Video
    'video/mp4',
    'video/mpeg',
    'video/x-msvideo',
    'video/webm',
    'video/quicktime'
];
console.log(env_configs_1.env.AWS_REGION);
const s3 = new client_s3_1.S3Client({
    region: env_configs_1.env.AWS_REGION,
    credentials: {
        accessKeyId: env_configs_1.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env_configs_1.env.AWS_SECRET_ACCESS_KEY,
    },
});
exports.upload = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3,
        bucket: env_configs_1.env.S3_BUCKET_NAME || "vitalaidnsr",
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, `uploads/${uniqueSuffix}-${file.originalname}`);
        },
    }),
    fileFilter: (req, file, cb) => {
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid file type, only JPEG, PNG, and GIF are allowed!'));
        }
    },
});
//# sourceMappingURL=file.middleware.js.map