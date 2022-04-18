"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HasPermissionDecorator = void 0;
const common_1 = require("@nestjs/common");
const HasPermissionDecorator = (access) => (0, common_1.SetMetadata)('resource', access);
exports.HasPermissionDecorator = HasPermissionDecorator;
//# sourceMappingURL=has-permission.decorator.js.map