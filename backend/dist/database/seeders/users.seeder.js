"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedUsers = seedUsers;
const data_source_1 = require("../data-source");
const bcrypt = __importStar(require("bcrypt"));
const usersData = [
    {
        email: 'buyer1@example.com',
        password: 'buyer@123',
        name: 'Rajesh Kumar',
        phone: '9876543210',
        type: 'buyer',
    },
    {
        email: 'buyer2@example.com',
        password: 'buyer@123',
        name: 'Priya Sharma',
        phone: '9876543211',
        type: 'buyer',
    },
    {
        email: 'buyer3@example.com',
        password: 'buyer@123',
        name: 'Amit Patel',
        phone: '9876543212',
        type: 'buyer',
    },
    {
        email: 'buyer4@example.com',
        password: 'buyer@123',
        name: 'Sneha Reddy',
        phone: '9876543213',
        type: 'buyer',
    },
    {
        email: 'buyer5@example.com',
        password: 'buyer@123',
        name: 'Vikram Singh',
        phone: '9876543214',
        type: 'buyer',
    },
    {
        email: 'seller1@example.com',
        password: 'seller@123',
        name: 'Suresh Gupta',
        phone: '9876543215',
        type: 'seller',
    },
    {
        email: 'seller2@example.com',
        password: 'seller@123',
        name: 'Anjali Verma',
        phone: '9876543216',
        type: 'seller',
    },
    {
        email: 'seller3@example.com',
        password: 'seller@123',
        name: 'Rahul Mehta',
        phone: '9876543217',
        type: 'seller',
    },
    {
        email: 'seller4@example.com',
        password: 'seller@123',
        name: 'Kavita Joshi',
        phone: '9876543218',
        type: 'seller',
    },
    {
        email: 'seller5@example.com',
        password: 'seller@123',
        name: 'Deepak Agarwal',
        phone: '9876543219',
        type: 'seller',
    },
];
async function seedUsers() {
    try {
        if (!data_source_1.AppDataSource.isInitialized) {
            await data_source_1.AppDataSource.initialize();
        }
        const queryRunner = data_source_1.AppDataSource.createQueryRunner();
        await queryRunner.connect();
        console.log('Starting users seeding...');
        for (const userData of usersData) {
            const existingUser = await queryRunner.query('SELECT id FROM users WHERE email = $1', [userData.email]);
            if (existingUser.length > 0) {
                console.log(`User ${userData.email} already exists, skipping...`);
                continue;
            }
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            await queryRunner.query('INSERT INTO users (email, password, name, phone) VALUES ($1, $2, $3, $4)', [userData.email, hashedPassword, userData.name, userData.phone]);
            console.log(`Inserted ${userData.type} user: ${userData.name} (${userData.email})`);
        }
        await queryRunner.release();
        console.log('Users seeding completed successfully!');
    }
    catch (error) {
        console.error('Error seeding users:', error);
        throw error;
    }
}
if (require.main === module) {
    seedUsers()
        .then(() => {
        console.log('Seeding completed');
        process.exit(0);
    })
        .catch((error) => {
        console.error('Seeding failed:', error);
        process.exit(1);
    });
}
//# sourceMappingURL=users.seeder.js.map