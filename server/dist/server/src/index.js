"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//* libraries and packages
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const env_configs_1 = require("./configs/env.configs");
const mongo_config_1 = require("./configs/mongo.config");
const auth_routes_1 = require("./routes/auth.routes");
const file_routes_1 = require("./routes/file.routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: env_configs_1.env.CLIENT_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/auth", auth_routes_1.auth);
app.use("/api/file", file_routes_1.file);
app.use(express_1.default.urlencoded({ extended: true }));
(0, mongo_config_1.connectDb)();
app.listen(env_configs_1.env.PORT, () => console.log(`Server started at ${env_configs_1.env.PORT} `));
//# sourceMappingURL=index.js.map