"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAdsTable1704000000007 = void 0;
const typeorm_1 = require("typeorm");
class CreateAdsTable1704000000007 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'ads',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'title',
                    type: 'varchar',
                    length: '100',
                    isNullable: false,
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'price',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                    isNullable: false,
                },
                {
                    name: 'userId',
                    type: 'uuid',
                    isNullable: false,
                },
                {
                    name: 'categoryId',
                    type: 'uuid',
                    isNullable: false,
                },
                {
                    name: 'cityId',
                    type: 'uuid',
                    isNullable: false,
                },
                {
                    name: 'areaId',
                    type: 'uuid',
                    isNullable: false,
                },
                {
                    name: 'views',
                    type: 'integer',
                    default: 0,
                },
                {
                    name: 'isActive',
                    type: 'boolean',
                    default: true,
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);
        await queryRunner.createForeignKey('ads', new typeorm_1.TableForeignKey({
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('ads', new typeorm_1.TableForeignKey({
            columnNames: ['categoryId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'leaf_categories',
            onDelete: 'RESTRICT',
        }));
        await queryRunner.createForeignKey('ads', new typeorm_1.TableForeignKey({
            columnNames: ['cityId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'cities',
            onDelete: 'RESTRICT',
        }));
        await queryRunner.createForeignKey('ads', new typeorm_1.TableForeignKey({
            columnNames: ['areaId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'areas',
            onDelete: 'RESTRICT',
        }));
        await queryRunner.createIndex('ads', new typeorm_1.TableIndex({
            name: 'IDX_ADS_CATEGORY',
            columnNames: ['categoryId'],
        }));
        await queryRunner.createIndex('ads', new typeorm_1.TableIndex({
            name: 'IDX_ADS_CITY',
            columnNames: ['cityId'],
        }));
        await queryRunner.createIndex('ads', new typeorm_1.TableIndex({
            name: 'IDX_ADS_AREA',
            columnNames: ['areaId'],
        }));
        await queryRunner.createIndex('ads', new typeorm_1.TableIndex({
            name: 'IDX_ADS_IS_ACTIVE',
            columnNames: ['isActive'],
        }));
        await queryRunner.createIndex('ads', new typeorm_1.TableIndex({
            name: 'IDX_ADS_CREATED_AT',
            columnNames: ['createdAt'],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropIndex('ads', 'IDX_ADS_CREATED_AT');
        await queryRunner.dropIndex('ads', 'IDX_ADS_IS_ACTIVE');
        await queryRunner.dropIndex('ads', 'IDX_ADS_AREA');
        await queryRunner.dropIndex('ads', 'IDX_ADS_CITY');
        await queryRunner.dropIndex('ads', 'IDX_ADS_CATEGORY');
        const table = await queryRunner.getTable('ads');
        if (table) {
            const foreignKeys = table.foreignKeys;
            for (const foreignKey of foreignKeys) {
                await queryRunner.dropForeignKey('ads', foreignKey);
            }
        }
        await queryRunner.dropTable('ads');
    }
}
exports.CreateAdsTable1704000000007 = CreateAdsTable1704000000007;
//# sourceMappingURL=1704000000007-CreateAdsTable.js.map