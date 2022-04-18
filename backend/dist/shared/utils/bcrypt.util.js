"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcrypt = require("bcryptjs");
async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}
exports.hashPassword = hashPassword;
async function comparePassword(p1, p2) {
    return await bcrypt.compare(p1, p2);
}
exports.comparePassword = comparePassword;
//# sourceMappingURL=bcrypt.util.js.map