import { SubCategory } from './sub-category.entity';
export declare class ParentCategory {
    id: string;
    name: string;
    slug: string;
    icon: string;
    subCategories: SubCategory[];
}
