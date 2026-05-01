import { Repository } from 'typeorm';
import { ParentCategory, SubCategory, LeafCategory } from './entities';
export interface CategoryTree {
    id: string;
    name: string;
    slug: string;
    icon: string;
    subCategories: {
        id: string;
        name: string;
        slug: string;
        leafCategories: {
            id: string;
            name: string;
            slug: string;
        }[];
    }[];
}
export declare class CategoriesService {
    private readonly parentCategoryRepository;
    private readonly subCategoryRepository;
    private readonly leafCategoryRepository;
    constructor(parentCategoryRepository: Repository<ParentCategory>, subCategoryRepository: Repository<SubCategory>, leafCategoryRepository: Repository<LeafCategory>);
    findAll(): Promise<CategoryTree[]>;
    findParentCategories(): Promise<ParentCategory[]>;
    findSubCategories(parentId: string): Promise<SubCategory[]>;
    findLeafCategories(subCategoryId: string): Promise<LeafCategory[]>;
}
