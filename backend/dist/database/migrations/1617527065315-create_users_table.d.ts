import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class createUsersTable1617527065315 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
