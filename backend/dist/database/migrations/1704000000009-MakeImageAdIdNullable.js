"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeImageAdIdNullable1704000000009 = void 0;
class MakeImageAdIdNullable1704000000009 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT IF EXISTS "FK_images_adId"`);
        await queryRunner.query(`ALTER TABLE "images" ALTER COLUMN "adId" DROP NOT NULL`);
        await queryRunner.query(`
      ALTER TABLE "images"
      ADD CONSTRAINT "FK_images_adId"
      FOREIGN KEY ("adId") REFERENCES "ads"("id") ON DELETE CASCADE
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT IF EXISTS "FK_images_adId"`);
        await queryRunner.query(`ALTER TABLE "images" ALTER COLUMN "adId" SET NOT NULL`);
        await queryRunner.query(`
      ALTER TABLE "images"
      ADD CONSTRAINT "FK_images_adId"
      FOREIGN KEY ("adId") REFERENCES "ads"("id") ON DELETE CASCADE
    `);
    }
}
exports.MakeImageAdIdNullable1704000000009 = MakeImageAdIdNullable1704000000009;
//# sourceMappingURL=1704000000009-MakeImageAdIdNullable.js.map