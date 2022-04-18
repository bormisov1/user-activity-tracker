"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const role_entity_1 = require("../../modules/role/entity/role.entity");
const permission_entity_1 = require("../../modules/permission/entity/permission.entity");
class AdminPermissionSeed {
    async run(factory, connection) {
        const adminRole = await connection
            .getRepository(role_entity_1.RoleEntity)
            .findOne({ where: { name: 'Admin' } });
        const permissions = await connection.getRepository(permission_entity_1.PermissionEntity).find();
        const permissionIds = permissions.map(p => p.id);
        await connection.getRepository(role_entity_1.RoleEntity).save(Object.assign(Object.assign({}, adminRole), { permissions: permissionIds.map(id => ({ id })) }));
    }
}
exports.default = AdminPermissionSeed;
//# sourceMappingURL=03_admin_permission.seed.js.map