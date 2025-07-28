"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.env = {
    get PORT() {
        return process.env.PORT;
    },
    get MONGO_URI() {
        return process.env.MONGO_URI;
    },
    get JWT_ACCESS_SECRET() {
        return process.env.JWT_ACCESS_SECRET;
    },
    get JWT_REFRESH_SECRET() {
        return process.env.JWT_REFRESH_SECRET;
    },
    get CLIENT_ORIGIN() {
        return process.env.CLIENT_ORIGIN;
    },
    get AWS_ACCESS_KEY_ID() {
        return process.env.AWS_ACCESS_KEY_ID;
    },
    get AWS_SECRET_ACCESS_KEY() {
        return process.env.AWS_SECRET_ACCESS_KEY;
    },
    get AWS_REGION() {
        return process.env.AWS_REGION;
    },
    get S3_BUCKET_NAME() {
        return process.env.S3_BUCKET_NAME;
    },
};
//# sourceMappingURL=env.configs.js.map