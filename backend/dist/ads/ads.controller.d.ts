import { AdsService, PaginatedResponse } from './ads.service';
import { CreateAdDto, UpdateAdDto, FindAdsDto } from './dto';
import { Ad } from './entities/ad.entity';
export declare class AdsController {
    private readonly adsService;
    constructor(adsService: AdsService);
    create(req: any, createAdDto: CreateAdDto): Promise<Ad>;
    findAll(query: FindAdsDto): Promise<PaginatedResponse<Ad>>;
    findById(id: string): Promise<Ad>;
    update(id: string, req: any, updateAdDto: UpdateAdDto): Promise<Ad>;
    delete(id: string, req: any): Promise<void>;
    incrementViews(id: string): Promise<{
        message: string;
    }>;
}
