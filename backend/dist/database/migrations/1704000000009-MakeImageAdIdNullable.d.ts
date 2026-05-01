import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class MakeImageAdIdNullable1704000000009 implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
