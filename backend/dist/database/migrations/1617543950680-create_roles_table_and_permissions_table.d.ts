import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class createRolesTableAndPermissionsTable1617543950680 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
