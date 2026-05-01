import { Repository } from 'typeorm';
import { Ad } from './entities/ad.entity';
import { CreateAdDto, UpdateAdDto, FindAdsDto } from './dto';
export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}
export declare class AdsService {
    private readonly adRepository;
    constructor(adRepository: Repository<Ad>);
    create(userId: string, createAdDto: CreateAdDto): Promise<Ad>;
    findAll(query: FindAdsDto): Promise<PaginatedResponse<Ad>>;
    findById(id: string): Promise<Ad>;
    update(id: string, userId: string, updateAdDto: UpdateAdDto): Promise<Ad>;
    softDelete(id: string, userId: string): Promise<void>;
    incrementViews(id: string): Promise<void>;
}
