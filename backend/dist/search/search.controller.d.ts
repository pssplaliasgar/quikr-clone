import { SearchService } from './search.service';
import { FindAdsDto } from '../ads/dto';
import { Ad } from '../ads/entities/ad.entity';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    search(query: FindAdsDto): Promise<import("./search.service").PaginatedResponse<Ad>>;
    autocomplete(term: string): Promise<string[]>;
}
