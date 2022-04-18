"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserAuthSessionsTable1617532002319 = void 0;
class createUserAuthSessionsTable1617532002319 {
    constructor() {
        this.name = 'createUserAuthSessionsTable1617532002319';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user_auth_sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "access_token" text NOT NULL, "refresh_token" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_79bd169d1dce6477e021508189b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_auth_sessions" ADD CONSTRAINT "FK_ca176d084cdae42ad482e139c51" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_auth_sessions" DROP CONSTRAINT "FK_ca176d084cdae42ad482e139c51"`);
        await queryRunner.query(`DROP TABLE "user_auth_sessions"`);
    }
}
exports.createUserAuthSessionsTable1617532002319 = createUserAuthSessionsTable1617532002319;
//# sourceMappingURL=1617532002319-create_user_auth_sessions_table.js.map