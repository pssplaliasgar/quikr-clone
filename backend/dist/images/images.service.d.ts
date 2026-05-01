import { Repository } from 'typeorm';
import { Image } from './entities';
import { ConfigService } from '@nestjs/config';
export declare class ImagesService {
    private readonly imageRepository;
    private readonly configService;
    private readonly logger;
    private readonly uploadsDir;
    constructor(imageRepository: Repository<Image>, configService: ConfigService);
    uploadImage(file: Express.Multer.File, adId?: string, order?: number): Promise<Image>;
    validateImage(file: Express.Multer.File): void;
    deleteImage(id: string): Promise<void>;
    findById(id: string): Promise<Image>;
    findByAdId(adId: string): Promise<Image[]>;
    associateImageWithAd(url: string, adId: string, order?: number): Promise<Image>;
    deleteByAdId(adId: string): Promise<void>;
}
