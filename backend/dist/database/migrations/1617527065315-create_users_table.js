"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUsersTable1617527065315 = void 0;
class createUsersTable1617527065315 {
    constructor() {
        this.name = 'createUsersTable1617527065315';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" text NOT NULL, "password" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
exports.createUsersTable1617527065315 = createUsersTable1617527065315;
//# sourceMappingURL=1617527065315-create_users_table.js.map