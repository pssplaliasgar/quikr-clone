"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAreasTable1704000000006 = void 0;
const typeorm_1 = require("typeorm");
class CreateAreasTable1704000000006 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'areas',
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
                    name: 'cityId',
                    type: 'uuid',
                    isNullable: false,
                },
            ],
        }), true);
        await queryRunner.createForeignKey('areas', new typeorm_1.TableForeignKey({
            columnNames: ['cityId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'cities',
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('areas');
        if (table) {
            const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('cityId') !== -1);
            if (foreignKey) {
                await queryRunner.dropForeignKey('areas', foreignKey);
            }
        }
        await queryRunner.dropTable('areas');
    }
}
exports.CreateAreasTable1704000000006 = CreateAreasTable1704000000006;
//# sourceMappingURL=1704000000006-CreateAreasTable.js.map