import { City } from './city.entity';
import { Ad } from '../../ads/entities/ad.entity';
export declare class Area {
    id: string;
    name: string;
    city: City;
    cityId: string;
    ads: Ad[];
}
