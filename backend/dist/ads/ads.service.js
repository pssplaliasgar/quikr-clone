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
exports.AdsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ad_entity_1 = require("./entities/ad.entity");
const dto_1 = require("./dto");
let AdsService = class AdsService {
    adRepository;
    constructor(adRepository) {
        this.adRepository = adRepository;
    }
    async create(userId, createAdDto) {
        const ad = this.adRepository.create({
            ...createAdDto,
            userId,
            isActive: true,
            views: 0,
        });
        return this.adRepository.save(ad);
    }
    async findAll(query) {
        const { categoryId, parentCategoryId, subCategoryId, cityId, areaId, minPrice, maxPrice, search, sortBy = dto_1.SortBy.NEWEST, page = 1, limit = 20, } = query;
        const queryBuilder = this.adRepository
            .createQueryBuilder('ad')
            .leftJoinAndSelect('ad.user', 'user')
            .leftJoinAndSelect('ad.category', 'category')
            .leftJoinAndSelect('category.subCategory', 'subCategory')
            .leftJoinAndSelect('subCategory.parent', 'parentCategory')
            .leftJoinAndSelect('ad.city', 'city')
            .leftJoinAndSelect('ad.area', 'area')
            .leftJoinAndSelect('ad.images', 'images')
            .where('ad.isActive = :isActive', { isActive: true });
        if (categoryId) {
            queryBuilder.andWhere('ad.categoryId = :categoryId', { categoryId });
        }
        if (parentCategoryId) {
            queryBuilder.andWhere('parentCategory.id = :parentCategoryId', { parentCategoryId });
        }
        if (subCategoryId) {
            queryBuilder.andWhere('subCategory.id = :subCategoryId', { subCategoryId });
        }
        if (cityId) {
            queryBuilder.andWhere('ad.cityId = :cityId', { cityId });
        }
        if (areaId) {
            queryBuilder.andWhere('ad.areaId = :areaId', { areaId });
        }
        if (minPrice !== undefined) {
            queryBuilder.andWhere('ad.price >= :minPrice', { minPrice });
        }
        if (maxPrice !== undefined) {
            queryBuilder.andWhere('ad.price <= :maxPrice', { maxPrice });
        }
        if (search) {
            queryBuilder.andWhere('(LOWER(ad.title) LIKE LOWER(:search) OR LOWER(ad.description) LIKE LOWER(:search))', { search: `%${search}%` });
        }
        switch (sortBy) {
            case dto_1.SortBy.NEWEST:
                queryBuilder.orderBy('ad.createdAt', 'DESC');
                break;
            case dto_1.SortBy.OLDEST:
                queryBuilder.orderBy('ad.createdAt', 'ASC');
                break;
            case dto_1.SortBy.PRICE_ASC:
                queryBuilder.orderBy('ad.price', 'ASC');
                break;
            case dto_1.SortBy.PRICE_DESC:
                queryBuilder.orderBy('ad.price', 'DESC');
                break;
            default:
                queryBuilder.orderBy('ad.createdAt', 'DESC');
        }
        const skip = (page - 1) * limit;
        queryBuilder.skip(skip).take(limit);
        const [data, total] = await queryBuilder.getManyAndCount();
        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findById(id) {
        const ad = await this.adRepository.findOne({
            where: { id },
            relations: [
                'user',
                'category',
                'category.subCategory',
                'category.subCategory.parent',
                'city',
                'area',
                'images',
            ],
        });
        if (!ad) {
            throw new common_1.NotFoundException(`Ad with ID ${id} not found`);
        }
        return ad;
    }
    async update(id, userId, updateAdDto) {
        const ad = await this.findById(id);
        if (ad.userId !== userId) {
            throw new common_1.ForbiddenException('You can only update your own ads');
        }
        Object.assign(ad, updateAdDto);
        return this.adRepository.save(ad);
    }
    async softDelete(id, userId) {
        const ad = await this.findById(id);
        if (ad.userId !== userId) {
            throw new common_1.ForbiddenException('You can only delete your own ads');
        }
        ad.isActive = false;
        await this.adRepository.save(ad);
    }
    async incrementViews(id) {
        const ad = await this.findById(id);
        ad.views += 1;
        await this.adRepository.save(ad);
    }
};
exports.AdsService = AdsService;
exports.AdsService = AdsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ad_entity_1.Ad)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AdsService);
//# sourceMappingURL=ads.service.js.map