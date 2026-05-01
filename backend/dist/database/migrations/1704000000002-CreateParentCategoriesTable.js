"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateParentCategoriesTable1704000000002 = void 0;
const typeorm_1 = require("typeorm");
class CreateParentCategoriesTable1704000000002 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'parent_categories',
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
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: 'slug',
                    type: 'varchar',
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: 'icon',
                    type: 'varchar',
                    isNullable: true,
                },
            ],
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('parent_categories');
    }
}
exports.CreateParentCategoriesTable1704000000002 = CreateParentCategoriesTable1704000000002;
//# sourceMappingURL=1704000000002-CreateParentCategoriesTable.js.map