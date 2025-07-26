"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toObjectId = void 0;
const mongoose_1 = require("mongoose");
const toObjectId = (id) => {
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        const error = new Error(`Invalid ObjectId format: '${id}'`);
        error.name = "InvalidObjectIdError";
        throw error;
    }
    return new mongoose_1.Types.ObjectId(id);
};
exports.toObjectId = toObjectId;
//# sourceMappingURL=objectId.utils.js.map