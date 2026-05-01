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
exports.FindAdsDto = exports.SortBy = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
var SortBy;
(function (SortBy) {
    SortBy["NEWEST"] = "newest";
    SortBy["OLDEST"] = "oldest";
    SortBy["PRICE_ASC"] = "price_asc";
    SortBy["PRICE_DESC"] = "price_desc";
})(SortBy || (exports.SortBy = SortBy = {}));
class FindAdsDto {
    categoryId;
    parentCategoryId;
    subCategoryId;
    cityId;
    areaId;
    minPrice;
    maxPrice;
    search;
    sortBy = SortBy.NEWEST;
    page = 1;
    limit = 20;
}
exports.FindAdsDto = FindAdsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by leaf category ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4', { message: 'Category ID must be a valid UUID' }),
    __metadata("design:type", String)
], FindAdsDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by parent category ID (returns all ads under this parent)',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4', { message: 'Parent category ID must be a valid UUID' }),
    __metadata("design:type", String)
], FindAdsDto.prototype, "parentCategoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by sub-category ID (returns all ads under this sub-category)',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4', { message: 'Sub-category ID must be a valid UUID' }),
    __metadata("design:type", String)
], FindAdsDto.prototype, "subCategoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by city ID',
        example: '123e4567-e89b-12d3-a456-426614174001',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4', { message: 'City ID must be a valid UUID' }),
    __metadata("design:type", String)
], FindAdsDto.prototype, "cityId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by area ID',
        example: '123e4567-e89b-12d3-a456-426614174002',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4', { message: 'Area ID must be a valid UUID' }),
    __metadata("design:type", String)
], FindAdsDto.prototype, "areaId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Minimum price filter',
        example: 1000,
        minimum: 0,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'Minimum price must be a valid number' }),
    (0, class_validator_1.Min)(0, { message: 'Minimum price must be a positive number' }),
    __metadata("design:type", Number)
], FindAdsDto.prototype, "minPrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Maximum price filter',
        example: 50000,
        minimum: 0,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'Maximum price must be a valid number' }),
    (0, class_validator_1.Min)(0, { message: 'Maximum price must be a positive number' }),
    __metadata("design:type", Number)
], FindAdsDto.prototype, "maxPrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Search query for title and description',
        example: 'iPhone',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FindAdsDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Sort order',
        enum: SortBy,
        default: SortBy.NEWEST,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(SortBy, { message: 'Sort by must be one of: newest, oldest, price_asc, price_desc' }),
    __metadata("design:type", String)
], FindAdsDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Page number',
        example: 1,
        minimum: 1,
        default: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ message: 'Page must be an integer' }),
    (0, class_validator_1.Min)(1, { message: 'Page must be at least 1' }),
    __metadata("design:type", Number)
], FindAdsDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Number of items per page',
        example: 20,
        minimum: 1,
        maximum: 100,
        default: 20,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ message: 'Limit must be an integer' }),
    (0, class_validator_1.Min)(1, { message: 'Limit must be at least 1' }),
    (0, class_validator_1.Max)(100, { message: 'Limit must not exceed 100' }),
    __metadata("design:type", Number)
], FindAdsDto.prototype, "limit", void 0);
//# sourceMappingURL=find-ads.dto.js.map