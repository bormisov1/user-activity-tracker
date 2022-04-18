import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class createUserAuthSessionsTable1617532002319 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
