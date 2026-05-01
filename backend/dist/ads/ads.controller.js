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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ads_service_1 = require("./ads.service");
const dto_1 = require("./dto");
const ad_entity_1 = require("./entities/ad.entity");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let AdsController = class AdsController {
    adsService;
    constructor(adsService) {
        this.adsService = adsService;
    }
    async create(req, createAdDto) {
        return this.adsService.create(req.user.id, createAdDto);
    }
    async findAll(query) {
        return this.adsService.findAll(query);
    }
    async findById(id) {
        return this.adsService.findById(id);
    }
    async update(id, req, updateAdDto) {
        return this.adsService.update(id, req.user.id, updateAdDto);
    }
    async delete(id, req) {
        return this.adsService.softDelete(id, req.user.id);
    }
    async incrementViews(id) {
        await this.adsService.incrementViews(id);
        return { message: 'View count incremented successfully' };
    }
};
exports.AdsController = AdsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new ad' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Ad created successfully',
        type: ad_entity_1.Ad,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.CreateAdDto]),
    __metadata("design:returntype", Promise)
], AdsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all ads with filters and pagination' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Ads retrieved successfully',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FindAdsDto]),
    __metadata("design:returntype", Promise)
], AdsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get ad details by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Ad UUID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Ad retrieved successfully',
        type: ad_entity_1.Ad,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Ad not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdsController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update an ad' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Ad UUID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Ad updated successfully',
        type: ad_entity_1.Ad,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - not the owner' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Ad not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, dto_1.UpdateAdDto]),
    __metadata("design:returntype", Promise)
], AdsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an ad (soft delete)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Ad UUID' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Ad deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - not the owner' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Ad not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdsController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)(':id/view'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Increment view count for an ad' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Ad UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'View count incremented' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Ad not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdsController.prototype, "incrementViews", null);
exports.AdsController = AdsController = __decorate([
    (0, swagger_1.ApiTags)('ads'),
    (0, common_1.Controller)('ads'),
    __metadata("design:paramtypes", [ads_service_1.AdsService])
], AdsController);
//# sourceMappingURL=ads.controller.js.map