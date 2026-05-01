"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedImages = seedImages;
const data_source_1 = require("../data-source");
const placeholderImageUrls = [
    'https://picsum.photos/seed/ad1/800/600',
    'https://picsum.photos/seed/ad2/800/600',
    'https://picsum.photos/seed/ad3/800/600',
    'https://picsum.photos/seed/ad4/800/600',
    'https://picsum.photos/seed/ad5/800/600',
    'https://picsum.photos/seed/ad6/800/600',
    'https://picsum.photos/seed/ad7/800/600',
    'https://picsum.photos/seed/ad8/800/600',
    'https://picsum.photos/seed/ad9/800/600',
    'https://picsum.photos/seed/ad10/800/600',
    'https://picsum.photos/seed/ad11/800/600',
    'https://picsum.photos/seed/ad12/800/600',
    'https://picsum.photos/seed/ad13/800/600',
    'https://picsum.photos/seed/ad14/800/600',
    'https://picsum.photos/seed/ad15/800/600',
    'https://picsum.photos/seed/ad16/800/600',
    'https://picsum.photos/seed/ad17/800/600',
    'https://picsum.photos/seed/ad18/800/600',
    'https://picsum.photos/seed/ad19/800/600',
    'https://picsum.photos/seed/ad20/800/600',
];
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}
function generateFilename(adId, index) {
    return `ad-${adId}-image-${index}-${Date.now()}.jpg`;
}
async function seedImages() {
    try {
        if (!data_source_1.AppDataSource.isInitialized) {
            await data_source_1.AppDataSource.initialize();
        }
        const queryRunner = data_source_1.AppDataSource.createQueryRunner();
        await queryRunner.connect();
        console.log('Starting images seeding...');
        const ads = await queryRunner.query('SELECT id FROM ads');
        if (ads.length === 0) {
            console.log('No ads found. Please run ads seeder first.');
            await queryRunner.release();
            return;
        }
        let totalImagesCreated = 0;
        for (const ad of ads) {
            const numImages = Math.floor(Math.random() * 3) + 2;
            const existingImages = await queryRunner.query('SELECT id FROM images WHERE "adId" = $1', [ad.id]);
            if (existingImages.length > 0) {
                console.log(`Images already exist for ad ${ad.id}, skipping...`);
                continue;
            }
            for (let i = 0; i < numImages; i++) {
                const imageUrl = getRandomElement(placeholderImageUrls);
                const filename = generateFilename(ad.id, i + 1);
                const path = `/uploads/images/${filename}`;
                await queryRunner.query(`INSERT INTO images (filename, path, url, "adId", "order") 
           VALUES ($1, $2, $3, $4, $5)`, [filename, path, imageUrl, ad.id, i]);
                totalImagesCreated++;
            }
        }
        await queryRunner.release();
        console.log(`Images seeding completed successfully! Created ${totalImagesCreated} images.`);
    }
    catch (error) {
        console.error('Error seeding images:', error);
        throw error;
    }
}
if (require.main === module) {
    seedImages()
        .then(() => {
        console.log('Seeding completed');
        process.exit(0);
    })
        .catch((error) => {
        console.error('Seeding failed:', error);
        process.exit(1);
    });
}
//# sourceMappingURL=images.seeder.js.map