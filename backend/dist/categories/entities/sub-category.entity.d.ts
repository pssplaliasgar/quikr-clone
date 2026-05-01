import { ParentCategory } from './parent-category.entity';
import { LeafCategory } from './leaf-category.entity';
export declare class SubCategory {
    id: string;
    name: string;
    slug: string;
    parentId: string;
    parent: ParentCategory;
    leafCategories: LeafCategory[];
}
