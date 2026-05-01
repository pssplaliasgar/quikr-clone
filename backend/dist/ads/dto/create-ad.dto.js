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
exports.CreateAdDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateAdDto {
    title;
    description;
    price;
    categoryId;
    cityId;
    areaId;
}
exports.CreateAdDto = CreateAdDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ad title',
        example: 'iPhone 13 Pro Max 256GB',
        minLength: 10,
        maxLength: 100,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10, { message: 'Title must be at least 10 characters long' }),
    (0, class_validator_1.MaxLength)(100, { message: 'Title must not exceed 100 characters' }),
    __metadata("design:type", String)
], CreateAdDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ad description',
        example: 'Brand new iPhone 13 Pro Max with 256GB storage. Comes with original box and accessories. Never used, sealed pack.',
        minLength: 50,
        maxLength: 5000,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(50, { message: 'Description must be at least 50 characters long' }),
    (0, class_validator_1.MaxLength)(5000, { message: 'Description must not exceed 5000 characters' }),
    __metadata("design:type", String)
], CreateAdDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ad price in rupees',
        example: 95000,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'Price must be a valid number' }),
    (0, class_validator_1.Min)(0, { message: 'Price must be a positive number' }),
    __metadata("design:type", Number)
], CreateAdDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Leaf category ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, class_validator_1.IsUUID)('4', { message: 'Category ID must be a valid UUID' }),
    __metadata("design:type", String)
], CreateAdDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'City ID',
        example: '123e4567-e89b-12d3-a456-426614174001',
    }),
    (0, class_validator_1.IsUUID)('4', { message: 'City ID must be a valid UUID' }),
    __metadata("design:type", String)
], CreateAdDto.prototype, "cityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Area ID',
        example: '123e4567-e89b-12d3-a456-426614174002',
    }),
    (0, class_validator_1.IsUUID)('4', { message: 'Area ID must be a valid UUID' }),
    __metadata("design:type", String)
], CreateAdDto.prototype, "areaId", void 0);
//# sourceMappingURL=create-ad.dto.js.map