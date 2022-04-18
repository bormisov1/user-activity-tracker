"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../modules/permission/enums");
class SeedPermissions {
    async run(factory, connection) {
        let tableName = 'permissions';
        let permissions = [
            {
                name: `${enums_1.PERMISSIONS_PREFIX.CREATE}${enums_1.ROUTE_RESOURCE.ROLES}`,
            },
            {
                name: `${enums_1.PERMISSIONS_PREFIX.READ}${enums_1.ROUTE_RESOURCE.ROLES}`,
            },
            {
                name: `${enums_1.PERMISSIONS_PREFIX.UPDATE}${enums_1.ROUTE_RESOURCE.ROLES}`,
            },
            {
                name: `${enums_1.PERMISSIONS_PREFIX.DELETE}${enums_1.ROUTE_RESOURCE.ROLES}`,
            },
            {
                name: `${enums_1.PERMISSIONS_PREFIX.CREATE}${enums_1.ROUTE_RESOURCE.PERMISSIONS}`,
            },
            {
                name: `${enums_1.PERMISSIONS_PREFIX.READ}${enums_1.ROUTE_RESOURCE.PERMISSIONS}`,
            },
            {
                name: `${enums_1.PERMISSIONS_PREFIX.UPDATE}${enums_1.ROUTE_RESOURCE.PERMISSIONS}`,
            },
            {
                name: `${enums_1.PERMISSIONS_PREFIX.DELETE}${enums_1.ROUTE_RESOURCE.PERMISSIONS}`,
            },
            {
                name: `${enums_1.PERMISSIONS_PREFIX.CREATE}${enums_1.ROUTE_RESOURCE.USERS}`,
            },
            {
                name: `${enums_1.PERMISSIONS_PREFIX.READ}${enums_1.ROUTE_RESOURCE.USERS}`,
            },
            {
                name: `${enums_1.PERMISSIONS_PREFIX.UPDATE}${enums_1.ROUTE_RESOURCE.USERS}`,
            },
            {
                name: `${enums_1.PERMISSIONS_PREFIX.DELETE}${enums_1.ROUTE_RESOURCE.USERS}`,
            },
        ];
        await connection
            .getRepository(tableName)
            .save([...permissions], { chunk: 500 });
    }
}
exports.default = SeedPermissions;
//# sourceMappingURL=02_permissions.seed.js.map