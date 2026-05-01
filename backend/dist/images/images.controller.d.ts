import type { Response } from 'express';
import { ImagesService } from './images.service';
import { Image } from './entities';
declare class AssociateImageDto {
    url: string;
    adId: string;
    order?: number;
}
export declare class ImagesController {
    private readonly imagesService;
    private readonly logger;
    constructor(imagesService: ImagesService);
    uploadImage(file: Express.Multer.File): Promise<Image>;
    associateImage(dto: AssociateImageDto): Promise<Image>;
    getImage(filename: string, res: Response): Promise<void>;
}
export {};
