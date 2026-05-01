import { SubCategory } from './sub-category.entity';
import { Ad } from '../../ads/entities/ad.entity';
export declare class LeafCategory {
    id: string;
    name: string;
    slug: string;
    subCategoryId: string;
    subCategory: SubCategory;
    ads: Ad[];
}
