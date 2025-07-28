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
exports.AuthService = void 0;
const user_models_1 = __importDefault(require("../../models/user.models"));
const bcrypt_utils_1 = require("../../utils/bcrypt.utils");
const generate_token_utils_1 = require("../../utils/generate.token.utils");
const objectId_utils_1 = require("../../utils/objectId.utils");
//  interface file extends Express.Multer.File {
//   fieldname: string;
//   originalname: string;
//   encoding: string;
//   mimetype: string;
//   size: number;
//   bucket: string;
//   key: string;
//   acl: string;
//   contentType: string;
//   location: string;
// }
class AuthService {
    register(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password } = userData;
            const existingUser = yield user_models_1.default.findOne({ email });
            if (existingUser) {
                return {
                    success: false,
                    statuscode: 400,
                    message: "user already exists",
                    user: null,
                    token: "",
                    refreshToken: ""
                };
            }
            const hashedPassword = yield (0, bcrypt_utils_1.hashPassword)(password);
            if (!hashedPassword)
                throw new Error("password hashing failed");
            const user = new user_models_1.default({
                email,
                password: hashedPassword,
                username: username,
            });
            yield user.save();
            const payload = {
                email,
                type: "user",
            };
            const verifiedId = (0, objectId_utils_1.toObjectId)(user._id.toString());
            const token = yield (0, generate_token_utils_1.generateToken)(verifiedId.toString(), payload, "7d");
            const refreshToken = yield (0, generate_token_utils_1.generateRefreshToken)(verifiedId.toString(), "7d");
            if (!refreshToken)
                throw new Error("refresh token generation failed");
            if (!token)
                throw new Error("token generation failed");
            return {
                statuscode: 201,
                success: true,
                message: "User registered successfully",
                user: user,
                token,
                refreshToken,
            };
        });
    }
    login(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = userData;
            const user = yield user_models_1.default.findOne({ email });
            if (!user) {
                return {
                    success: false,
                    statuscode: 404,
                    message: "user not found",
                    user: null,
                    token: "",
                    refreshToken: ""
                };
            }
            const isPasswordValid = yield (0, bcrypt_utils_1.comparePassword)(password, user.password);
            if (!isPasswordValid) {
                return {
                    success: false,
                    statuscode: 400,
                    message: "Invalid password",
                    user: null,
                    token: "",
                    refreshToken: ""
                };
            }
            const payload = {
                email: user.email,
                type: "user",
            };
            const verifiedId = (0, objectId_utils_1.toObjectId)(user._id.toString());
            const token = yield (0, generate_token_utils_1.generateToken)(verifiedId.toString(), payload, "7d");
            const refreshToken = yield (0, generate_token_utils_1.generateRefreshToken)(verifiedId.toString(), "7d");
            if (!token || !refreshToken) {
                throw new Error("Token generation failed");
            }
            return {
                statuscode: 200,
                success: true,
                message: "Login successfully",
                user: user,
                token,
                refreshToken,
            };
        });
    }
    logout(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                statuscode: 200,
                message: "Logout successful",
                success: true,
            };
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map