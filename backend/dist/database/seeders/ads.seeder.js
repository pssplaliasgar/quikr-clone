"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAds = seedAds;
const data_source_1 = require("../data-source");
const adTemplates = {
    electronics: [
        {
            title: 'iPhone 13 Pro Max 256GB',
            description: 'Excellent condition iPhone 13 Pro Max with 256GB storage. Pacific Blue color. Comes with original box, charger, and accessories. Battery health 95%. No scratches or dents. Single owner, well maintained.',
            priceRange: [75000, 85000],
        },
        {
            title: 'Samsung 55 inch 4K Smart TV',
            description: 'Brand new Samsung 55 inch 4K UHD Smart TV with HDR support. Crystal clear picture quality with vibrant colors. Built-in WiFi and streaming apps. Comes with wall mount and remote. 1 year warranty remaining.',
            priceRange: [45000, 55000],
        },
        {
            title: 'Dell XPS 15 Laptop i7 16GB RAM',
            description: 'High performance Dell XPS 15 laptop with Intel Core i7 11th gen processor, 16GB RAM, 512GB SSD. 15.6 inch FHD display. Perfect for professionals and students. Barely used, like new condition.',
            priceRange: [85000, 95000],
        },
        {
            title: 'Canon EOS 1500D DSLR Camera',
            description: 'Canon EOS 1500D DSLR camera with 18-55mm lens. Perfect for beginners and photography enthusiasts. Includes camera bag, memory card, and extra battery. Excellent condition with minimal shutter count.',
            priceRange: [25000, 30000],
        },
        {
            title: 'Sony Home Theater System 5.1',
            description: 'Sony 5.1 channel home theater system with powerful subwoofer. Crystal clear sound quality. Bluetooth connectivity. Perfect for movies and music. All speakers and cables included.',
            priceRange: [18000, 22000],
        },
    ],
    furniture: [
        {
            title: '3 Seater Leather Sofa Set',
            description: 'Premium quality 3 seater leather sofa in brown color. Very comfortable with high-density foam cushions. Sturdy wooden frame. Excellent condition, barely used. Perfect for living room.',
            priceRange: [25000, 35000],
        },
        {
            title: 'King Size Bed with Mattress',
            description: 'Solid wood king size bed with premium orthopedic mattress. Dark walnut finish. Includes side tables. Very comfortable and durable. Only 6 months old, like new condition.',
            priceRange: [30000, 40000],
        },
        {
            title: '6 Seater Dining Table Set',
            description: 'Beautiful 6 seater dining table with chairs. Solid wood construction with glass top. Modern design. Chairs have comfortable cushioned seats. Perfect for family dining.',
            priceRange: [20000, 28000],
        },
        {
            title: 'Ergonomic Office Chair',
            description: 'High-back ergonomic office chair with lumbar support. Adjustable height and armrests. Breathable mesh back. Perfect for long working hours. Excellent condition.',
            priceRange: [8000, 12000],
        },
        {
            title: '4 Door Wooden Wardrobe',
            description: 'Spacious 4 door wardrobe with mirror. Solid wood construction. Multiple shelves and hanging space. Perfect for bedroom storage. Good condition, well maintained.',
            priceRange: [15000, 20000],
        },
    ],
    cars: [
        {
            title: 'Maruti Swift VXI 2018',
            description: 'Well maintained Maruti Swift VXI petrol 2018 model. Single owner, all service records available. Excellent mileage. AC, power windows, music system. White color. 45000 km driven.',
            priceRange: [450000, 500000],
        },
        {
            title: 'Hyundai Creta SX 2020',
            description: 'Hyundai Creta SX diesel 2020 model in pristine condition. Loaded with features - sunroof, leather seats, touchscreen infotainment. First owner. 30000 km only. Red color.',
            priceRange: [1200000, 1350000],
        },
        {
            title: 'Honda City ZX 2019',
            description: 'Honda City ZX petrol automatic 2019. Top variant with all features. Excellent condition, regularly serviced. Silver color. 40000 km driven. Non-accidental, single owner.',
            priceRange: [850000, 950000],
        },
    ],
    bikes: [
        {
            title: 'Royal Enfield Classic 350',
            description: 'Royal Enfield Classic 350 in excellent condition. Black color. Well maintained with all service records. New tyres and battery. Single owner. 15000 km driven.',
            priceRange: [120000, 140000],
        },
        {
            title: 'Honda Activa 6G 2021',
            description: 'Honda Activa 6G scooter 2021 model. Excellent mileage and performance. Grey color. Barely used, like new condition. All papers clear. 5000 km only.',
            priceRange: [65000, 72000],
        },
        {
            title: 'Hero Splendor Plus 2020',
            description: 'Hero Splendor Plus 2020 model in great condition. Best mileage bike. Black color. Well maintained. All documents ready. 20000 km driven.',
            priceRange: [45000, 52000],
        },
    ],
    properties: [
        {
            title: '2 BHK Apartment for Rent',
            description: 'Spacious 2 BHK apartment available for rent. 1000 sq ft. Semi-furnished with modular kitchen. 24/7 water and power backup. Parking available. Family preferred. Immediate possession.',
            priceRange: [15000, 20000],
        },
        {
            title: '3 BHK Independent House for Sale',
            description: '3 BHK independent house for sale. 1500 sq ft built-up area. East facing. Good ventilation and natural light. Gated community. Park and clubhouse nearby. Clear title.',
            priceRange: [5500000, 6500000],
        },
        {
            title: 'Commercial Shop for Rent',
            description: 'Prime location commercial shop for rent. 500 sq ft. Ground floor. High footfall area. Suitable for retail business. Three phase electricity. Immediate availability.',
            priceRange: [25000, 35000],
        },
    ],
    jobs: [
        {
            title: 'Software Developer - Full Time',
            description: 'Hiring experienced software developer for full-time position. Required skills: Java, Spring Boot, React. 2-4 years experience. Good salary package with benefits. Work from office.',
            priceRange: [600000, 800000],
        },
        {
            title: 'Sales Executive - Part Time',
            description: 'Looking for energetic sales executive for part-time role. Good communication skills required. Flexible timings. Attractive incentives. Experience in retail preferred.',
            priceRange: [15000, 20000],
        },
        {
            title: 'Content Writer - Freelance',
            description: 'Seeking talented content writer for freelance projects. Must have excellent English writing skills. SEO knowledge preferred. Work from home. Payment per article.',
            priceRange: [300, 500],
        },
    ],
    services: [
        {
            title: 'Home Cleaning Service',
            description: 'Professional home cleaning service available. Deep cleaning, regular cleaning, kitchen cleaning. Trained staff with eco-friendly products. Affordable rates. Book now!',
            priceRange: [500, 1500],
        },
        {
            title: 'Plumbing Services',
            description: 'Expert plumbing services for all your needs. Leak repairs, pipe fitting, bathroom fitting, water tank cleaning. 24/7 available. Experienced plumbers. Reasonable charges.',
            priceRange: [300, 1000],
        },
        {
            title: 'Wedding Photography',
            description: 'Professional wedding photography services. Candid and traditional photography. HD videos. Drone shots. Album and digital copies included. Experienced team. Book early!',
            priceRange: [50000, 100000],
        },
    ],
    education: [
        {
            title: 'Math Tuition for Class 10-12',
            description: 'Experienced math teacher offering tuition for class 10-12 students. CBSE and state board. Concept clarity and problem solving focus. Home tuition available. Proven results.',
            priceRange: [3000, 5000],
        },
        {
            title: 'Guitar Classes for Beginners',
            description: 'Learn guitar from professional instructor. Beginner to advanced levels. Both acoustic and electric guitar. Theory and practical. Weekend batches available. Individual attention.',
            priceRange: [2000, 3000],
        },
        {
            title: 'Python Programming Course',
            description: 'Complete Python programming course for beginners. Covers basics to advanced topics. Hands-on projects. Job assistance provided. Online and offline classes. Certificate on completion.',
            priceRange: [10000, 15000],
        },
    ],
};
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}
function getRandomPrice(range) {
    return Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
}
function getRandomViews() {
    return Math.floor(Math.random() * 500);
}
async function seedAds() {
    try {
        if (!data_source_1.AppDataSource.isInitialized) {
            await data_source_1.AppDataSource.initialize();
        }
        const queryRunner = data_source_1.AppDataSource.createQueryRunner();
        await queryRunner.connect();
        console.log('Starting ads seeding...');
        const sellers = await queryRunner.query("SELECT id FROM users WHERE email LIKE 'seller%@example.com'");
        if (sellers.length === 0) {
            console.log('No seller users found. Please run users seeder first.');
            await queryRunner.release();
            return;
        }
        const leafCategories = await queryRunner.query('SELECT id, slug FROM leaf_categories');
        if (leafCategories.length === 0) {
            console.log('No leaf categories found. Please run categories seeder first.');
            await queryRunner.release();
            return;
        }
        const cities = await queryRunner.query('SELECT id FROM cities');
        if (cities.length === 0) {
            console.log('No cities found. Please run cities seeder first.');
            await queryRunner.release();
            return;
        }
        let totalAdsCreated = 0;
        for (const seller of sellers) {
            const numAds = Math.floor(Math.random() * 4) + 7;
            for (let i = 0; i < numAds; i++) {
                const category = getRandomElement(leafCategories);
                let templateKey = 'electronics';
                if (category.slug.includes('sofa') || category.slug.includes('bed') ||
                    category.slug.includes('table') || category.slug.includes('chair') ||
                    category.slug.includes('wardrobe')) {
                    templateKey = 'furniture';
                }
                else if (category.slug.includes('sedan') || category.slug.includes('suv') ||
                    category.slug.includes('hatchback') || category.slug.includes('luxury')) {
                    templateKey = 'cars';
                }
                else if (category.slug.includes('bike') || category.slug.includes('scooter') ||
                    category.slug.includes('cruiser') || category.slug.includes('commuter')) {
                    templateKey = 'bikes';
                }
                else if (category.slug.includes('bhk') || category.slug.includes('apartment') ||
                    category.slug.includes('house') || category.slug.includes('villa') ||
                    category.slug.includes('commercial') || category.slug.includes('land')) {
                    templateKey = 'properties';
                }
                else if (category.slug.includes('job') || category.slug.includes('sales') ||
                    category.slug.includes('marketing') || category.slug.includes('finance')) {
                    templateKey = 'jobs';
                }
                else if (category.slug.includes('cleaning') || category.slug.includes('plumbing') ||
                    category.slug.includes('repair') || category.slug.includes('photography')) {
                    templateKey = 'services';
                }
                else if (category.slug.includes('tuition') || category.slug.includes('class') ||
                    category.slug.includes('course') || category.slug.includes('programming')) {
                    templateKey = 'education';
                }
                const templates = adTemplates[templateKey] || adTemplates.electronics;
                const template = getRandomElement(templates);
                const city = getRandomElement(cities);
                const areas = await queryRunner.query('SELECT id FROM areas WHERE "cityId" = $1', [city.id]);
                if (areas.length === 0) {
                    continue;
                }
                const area = getRandomElement(areas);
                const price = getRandomPrice(template.priceRange);
                const views = getRandomViews();
                const existingAd = await queryRunner.query('SELECT id FROM ads WHERE title = $1 AND "userId" = $2', [template.title, seller.id]);
                if (existingAd.length > 0) {
                    continue;
                }
                await queryRunner.query(`INSERT INTO ads (title, description, price, "userId", "categoryId", "cityId", "areaId", views, "isActive") 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [
                    template.title,
                    template.description,
                    price,
                    seller.id,
                    category.id,
                    city.id,
                    area.id,
                    views,
                    true,
                ]);
                totalAdsCreated++;
            }
        }
        await queryRunner.release();
        console.log(`Ads seeding completed successfully! Created ${totalAdsCreated} ads.`);
    }
    catch (error) {
        console.error('Error seeding ads:', error);
        throw error;
    }
}
if (require.main === module) {
    seedAds()
        .then(() => {
        console.log('Seeding completed');
        process.exit(0);
    })
        .catch((error) => {
        console.error('Seeding failed:', error);
        process.exit(1);
    });
}
//# sourceMappingURL=ads.seeder.js.map