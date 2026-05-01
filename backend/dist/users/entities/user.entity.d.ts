import { Ad } from '../../ads/entities/ad.entity';
export declare class User {
    id: string;
    email: string;
    password: string;
    name: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
    ads: Ad[];
}
