"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateImagesTable1704000000008 = void 0;
const typeorm_1 = require("typeorm");
class CreateImagesTable1704000000008 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'images',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'filename',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'path',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'url',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'adId',
                    type: 'uuid',
                    isNullable: true,
                },
                {
                    name: 'order',
                    type: 'integer',
                    default: 0,
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);
        await queryRunner.createForeignKey('images', new typeorm_1.TableForeignKey({
            columnNames: ['adId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'ads',
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('images');
        if (table) {
            const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('adId') !== -1);
            if (foreignKey) {
                await queryRunner.dropForeignKey('images', foreignKey);
            }
        }
        await queryRunner.dropTable('images');
    }
}
exports.CreateImagesTable1704000000008 = CreateImagesTable1704000000008;
//# sourceMappingURL=1704000000008-CreateImagesTable.js.map