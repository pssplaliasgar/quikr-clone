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
exports.SubCategory = void 0;
const typeorm_1 = require("typeorm");
const parent_category_entity_1 = require("./parent-category.entity");
const leaf_category_entity_1 = require("./leaf-category.entity");
let SubCategory = class SubCategory {
    id;
    name;
    slug;
    parentId;
    parent;
    leafCategories;
};
exports.SubCategory = SubCategory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SubCategory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SubCategory.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SubCategory.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SubCategory.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parent_category_entity_1.ParentCategory, (parent) => parent.subCategories),
    (0, typeorm_1.JoinColumn)({ name: 'parentId' }),
    __metadata("design:type", parent_category_entity_1.ParentCategory)
], SubCategory.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => leaf_category_entity_1.LeafCategory, (leafCategory) => leafCategory.subCategory),
    __metadata("design:type", Array)
], SubCategory.prototype, "leafCategories", void 0);
exports.SubCategory = SubCategory = __decorate([
    (0, typeorm_1.Entity)('sub_categories')
], SubCategory);
//# sourceMappingURL=sub-category.entity.js.map