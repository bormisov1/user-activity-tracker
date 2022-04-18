"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRoleDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_role_dto_1 = require("./create-role.dto");
class UpdateRoleDTO extends (0, swagger_1.PartialType)(create_role_dto_1.CreateRoleDTO) {
}
exports.UpdateRoleDTO = UpdateRoleDTO;
//# sourceMappingURL=update-role.dto.js.map