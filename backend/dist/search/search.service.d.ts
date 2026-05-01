import { Repository } from 'typeorm';
import { Ad } from '../ads/entities/ad.entity';
import { FindAdsDto } from '../ads/dto';
export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}
export declare class SearchService {
    private readonly adRepository;
    constructor(adRepository: Repository<Ad>);
    search(query: FindAdsDto): Promise<PaginatedResponse<Ad>>;
    autocomplete(term: string): Promise<string[]>;
}
