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
exports.Image = void 0;
const typeorm_1 = require("typeorm");
const ad_entity_1 = require("../../ads/entities/ad.entity");
let Image = class Image {
    id;
    filename;
    path;
    url;
    adId;
    ad;
    order;
    createdAt;
};
exports.Image = Image;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Image.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Image.prototype, "filename", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Image.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Image.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Image.prototype, "adId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ad_entity_1.Ad, (ad) => ad.images, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'adId' }),
    __metadata("design:type", ad_entity_1.Ad)
], Image.prototype, "ad", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Image.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Image.prototype, "createdAt", void 0);
exports.Image = Image = __decorate([
    (0, typeorm_1.Entity)('images')
], Image);
//# sourceMappingURL=image.entity.js.map