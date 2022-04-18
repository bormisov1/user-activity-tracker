"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SeedRoles {
    async run(factory, connection) {
        let tableName = 'roles';
        let roles = [
            {
                name: 'Admin',
            },
            {
                name: 'User',
            },
        ];
        await connection.getRepository(tableName).save([...roles], { chunk: 500 });
    }
}
exports.default = SeedRoles;
//# sourceMappingURL=01_roles.seed.js.map