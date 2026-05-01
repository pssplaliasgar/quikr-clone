import { Area } from './area.entity';
import { Ad } from '../../ads/entities/ad.entity';
export declare class City {
    id: string;
    name: string;
    state: string;
    areas: Area[];
    ads: Ad[];
}
