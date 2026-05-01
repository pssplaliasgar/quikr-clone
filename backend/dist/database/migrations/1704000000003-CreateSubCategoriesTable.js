"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSubCategoriesTable1704000000003 = void 0;
const typeorm_1 = require("typeorm");
class CreateSubCategoriesTable1704000000003 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'sub_categories',
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
                    name: 'parentId',
                    type: 'uuid',
                    isNullable: false,
                },
            ],
        }), true);
        await queryRunner.createForeignKey('sub_categories', new typeorm_1.TableForeignKey({
            columnNames: ['parentId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'parent_categories',
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('sub_categories');
        if (table) {
            const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('parentId') !== -1);
            if (foreignKey) {
                await queryRunner.dropForeignKey('sub_categories', foreignKey);
            }
        }
        await queryRunner.dropTable('sub_categories');
    }
}
exports.CreateSubCategoriesTable1704000000003 = CreateSubCategoriesTable1704000000003;
//# sourceMappingURL=1704000000003-CreateSubCategoriesTable.js.map