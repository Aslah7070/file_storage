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
};
//# sourceMappingURL=env.configs.js.map