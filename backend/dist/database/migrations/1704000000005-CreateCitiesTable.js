"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCitiesTable1704000000005 = void 0;
const typeorm_1 = require("typeorm");
class CreateCitiesTable1704000000005 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'cities',
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
                    name: 'state',
                    type: 'varchar',
                    isNullable: false,
                },
            ],
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('cities');
    }
}
exports.CreateCitiesTable1704000000005 = CreateCitiesTable1704000000005;
//# sourceMappingURL=1704000000005-CreateCitiesTable.js.map