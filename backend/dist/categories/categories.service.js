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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("./entities");
let CategoriesService = class CategoriesService {
    parentCategoryRepository;
    subCategoryRepository;
    leafCategoryRepository;
    constructor(parentCategoryRepository, subCategoryRepository, leafCategoryRepository) {
        this.parentCategoryRepository = parentCategoryRepository;
        this.subCategoryRepository = subCategoryRepository;
        this.leafCategoryRepository = leafCategoryRepository;
    }
    async findAll() {
        const parentCategories = await this.parentCategoryRepository.find({
            relations: ['subCategories', 'subCategories.leafCategories'],
            order: {
                name: 'ASC',
                subCategories: {
                    name: 'ASC',
                    leafCategories: {
                        name: 'ASC',
                    },
                },
            },
        });
        return parentCategories.map((parent) => ({
            id: parent.id,
            name: parent.name,
            slug: parent.slug,
            icon: parent.icon,
            subCategories: parent.subCategories.map((sub) => ({
                id: sub.id,
                name: sub.name,
                slug: sub.slug,
                leafCategories: sub.leafCategories.map((leaf) => ({
                    id: leaf.id,
                    name: leaf.name,
                    slug: leaf.slug,
                })),
            })),
        }));
    }
    async findParentCategories() {
        return this.parentCategoryRepository.find({
            order: { name: 'ASC' },
        });
    }
    async findSubCategories(parentId) {
        const parentExists = await this.parentCategoryRepository.findOne({
            where: { id: parentId },
        });
        if (!parentExists) {
            throw new common_1.NotFoundException(`Parent category with ID ${parentId} not found`);
        }
        return this.subCategoryRepository.find({
            where: { parentId },
            order: { name: 'ASC' },
        });
    }
    async findLeafCategories(subCategoryId) {
        const subCategoryExists = await this.subCategoryRepository.findOne({
            where: { id: subCategoryId },
        });
        if (!subCategoryExists) {
            throw new common_1.NotFoundException(`Sub-category with ID ${subCategoryId} not found`);
        }
        return this.leafCategoryRepository.find({
            where: { subCategoryId },
            order: { name: 'ASC' },
        });
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.ParentCategory)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.SubCategory)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.LeafCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map