export declare enum SortBy {
    NEWEST = "newest",
    OLDEST = "oldest",
    PRICE_ASC = "price_asc",
    PRICE_DESC = "price_desc"
}
export declare class FindAdsDto {
    categoryId?: string;
    parentCategoryId?: string;
    subCategoryId?: string;
    cityId?: string;
    areaId?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    sortBy?: SortBy;
    page?: number;
    limit?: number;
}
