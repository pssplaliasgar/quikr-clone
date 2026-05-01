"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLeafCategoriesTable1704000000004 = void 0;
const typeorm_1 = require("typeorm");
class CreateLeafCategoriesTable1704000000004 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'leaf_categories',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'slug',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'subCategoryId',
                    type: 'uuid',
                    isNullable: false,
                },
            ],
        }), true);
        await queryRunner.createForeignKey('leaf_categories', new typeorm_1.TableForeignKey({
            columnNames: ['subCategoryId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'sub_categories',
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('leaf_categories');
        if (table) {
            const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('subCategoryId') !== -1);
            if (foreignKey) {
                await queryRunner.dropForeignKey('leaf_categories', foreignKey);
            }
        }
        await queryRunner.dropTable('leaf_categories');
    }
}
exports.CreateLeafCategoriesTable1704000000004 = CreateLeafCategoriesTable1704000000004;
//# sourceMappingURL=1704000000004-CreateLeafCategoriesTable.js.map