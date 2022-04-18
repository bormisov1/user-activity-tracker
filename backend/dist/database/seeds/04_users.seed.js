"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const utils_1 = require("../../shared/utils");
const role_entity_1 = require("../../modules/role/entity/role.entity");
class SeedUsers {
    async run(factory, connection) {
        let tableName = 'users';
        const adminRole = await connection
            .getRepository(role_entity_1.RoleEntity)
            .findOne({ where: { name: 'Admin' } });
        const userRole = await connection
            .getRepository(role_entity_1.RoleEntity)
            .findOne({ where: { name: 'User' } });
        let users = [
            {
                id: (0, uuid_1.v4)(),
                email: 'admin@mail.com',
                password: await (0, utils_1.hashPassword)('password'),
                role_id: adminRole.id,
            },
            {
                id: (0, uuid_1.v4)(),
                email: 'user@mail.com',
                password: await (0, utils_1.hashPassword)('password'),
                role_id: userRole.id,
            },
        ];
        await connection.getRepository(tableName).save([...users], { chunk: 500 });
    }
}
exports.default = SeedUsers;
//# sourceMappingURL=04_users.seed.js.map