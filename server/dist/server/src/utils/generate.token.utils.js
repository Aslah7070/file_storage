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
exports.generateToken = exports.generateRefreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_configs_1 = require("../configs/env.configs");
let JWT_SECRET = env_configs_1.env.JWT_ACCESS_SECRET || "your_jwt_secret_key";
const generateRefreshToken = (userId, expiresIn) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        expiresIn: expiresIn,
    };
    return jsonwebtoken_1.default.sign({ id: userId }, JWT_SECRET, options);
});
exports.generateRefreshToken = generateRefreshToken;
const generateToken = (userId, payload, expiresIn) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        expiresIn: expiresIn,
    };
    return jsonwebtoken_1.default.sign(Object.assign({ id: userId }, payload), JWT_SECRET, options);
});
exports.generateToken = generateToken;
//# sourceMappingURL=generate.token.utils.js.map