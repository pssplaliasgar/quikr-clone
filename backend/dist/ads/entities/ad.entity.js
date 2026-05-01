"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ad = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const leaf_category_entity_1 = require("../../categories/entities/leaf-category.entity");
const city_entity_1 = require("../../locations/entities/city.entity");
const area_entity_1 = require("../../locations/entities/area.entity");
let Ad = class Ad {
    id;
    title;
    description;
    price;
    user;
    userId;
    category;
    categoryId;
    city;
    cityId;
    area;
    areaId;
    views;
    isActive;
    createdAt;
    updatedAt;
    images;
};
exports.Ad = Ad;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Ad.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Ad.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Ad.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Ad.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.ads),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], Ad.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ad.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => leaf_category_entity_1.LeafCategory, (category) => category.ads),
    (0, typeorm_1.JoinColumn)({ name: 'categoryId' }),
    __metadata("design:type", leaf_category_entity_1.LeafCategory)
], Ad.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ad.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => city_entity_1.City, (city) => city.ads),
    (0, typeorm_1.JoinColumn)({ name: 'cityId' }),
    __metadata("design:type", city_entity_1.City)
], Ad.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ad.prototype, "cityId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => area_entity_1.Area, (area) => area.ads),
    (0, typeorm_1.JoinColumn)({ name: 'areaId' }),
    __metadata("design:type", area_entity_1.Area)
], Ad.prototype, "area", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ad.prototype, "areaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Ad.prototype, "views", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Ad.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Ad.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Ad.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('Image', 'ad'),
    __metadata("design:type", Array)
], Ad.prototype, "images", void 0);
exports.Ad = Ad = __decorate([
    (0, typeorm_1.Entity)('ads')
], Ad);
//# sourceMappingURL=ad.entity.js.map