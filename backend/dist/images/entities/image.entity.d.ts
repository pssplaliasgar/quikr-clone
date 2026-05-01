import { Ad } from '../../ads/entities/ad.entity';
export declare class Image {
    id: string;
    filename: string;
    path: string;
    url: string;
    adId: string;
    ad: Ad;
    order: number;
    createdAt: Date;
}
