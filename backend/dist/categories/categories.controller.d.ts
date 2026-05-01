import { CategoriesService, CategoryTree } from './categories.service';
import { ParentCategory, SubCategory, LeafCategory } from './entities';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(): Promise<CategoryTree[]>;
    findParentCategories(): Promise<ParentCategory[]>;
    findSubCategories(parentId: string): Promise<SubCategory[]>;
    findLeafCategories(subCategoryId: string): Promise<LeafCategory[]>;
}
