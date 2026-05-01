"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runAllSeeders = runAllSeeders;
const data_source_1 = require("../data-source");
const cities_areas_seeder_1 = require("./cities-areas.seeder");
const categories_seeder_1 = require("./categories.seeder");
const users_seeder_1 = require("./users.seeder");
const ads_seeder_1 = require("./ads.seeder");
const images_seeder_1 = require("./images.seeder");
async function runAllSeeders() {
    try {
        console.log('='.repeat(60));
        console.log('Starting Master Seeder');
        console.log('='.repeat(60));
        if (!data_source_1.AppDataSource.isInitialized) {
            console.log('Initializing database connection...');
            await data_source_1.AppDataSource.initialize();
            console.log('Database connection established.');
        }
        console.log('\n' + '-'.repeat(60));
        console.log('Step 1/5: Seeding Cities and Areas');
        console.log('-'.repeat(60));
        await (0, cities_areas_seeder_1.seedCitiesAndAreas)();
        console.log('\n' + '-'.repeat(60));
        console.log('Step 2/5: Seeding Categories');
        console.log('-'.repeat(60));
        await (0, categories_seeder_1.seedCategories)();
        console.log('\n' + '-'.repeat(60));
        console.log('Step 3/5: Seeding Users');
        console.log('-'.repeat(60));
        await (0, users_seeder_1.seedUsers)();
        console.log('\n' + '-'.repeat(60));
        console.log('Step 4/5: Seeding Ads');
        console.log('-'.repeat(60));
        await (0, ads_seeder_1.seedAds)();
        console.log('\n' + '-'.repeat(60));
        console.log('Step 5/5: Seeding Images');
        console.log('-'.repeat(60));
        await (0, images_seeder_1.seedImages)();
        console.log('\n' + '='.repeat(60));
        console.log('Master Seeder Completed Successfully!');
        console.log('='.repeat(60));
        console.log('\nDatabase has been seeded with:');
        console.log('  ✓ 50+ cities with areas');
        console.log('  ✓ Complete category hierarchy (Parent → Sub → Leaf)');
        console.log('  ✓ 10 users (5 buyers + 5 sellers)');
        console.log('  ✓ 35-50 ads with realistic data');
        console.log('  ✓ 70-200 images for ads');
        console.log('\nYou can now start the application and test with seeded data.');
        console.log('='.repeat(60));
    }
    catch (error) {
        console.error('\n' + '='.repeat(60));
        console.error('Master Seeder Failed!');
        console.error('='.repeat(60));
        console.error('Error:', error);
        throw error;
    }
    finally {
        if (data_source_1.AppDataSource.isInitialized) {
            await data_source_1.AppDataSource.destroy();
            console.log('\nDatabase connection closed.');
        }
    }
}
if (require.main === module) {
    runAllSeeders()
        .then(() => {
        console.log('\nSeeding process completed successfully.');
        process.exit(0);
    })
        .catch((error) => {
        console.error('\nSeeding process failed:', error);
        process.exit(1);
    });
}
//# sourceMappingURL=master.seeder.js.map