import { Repository } from 'typeorm';
import { City, Area } from './entities';
export declare class LocationsService {
    private readonly cityRepository;
    private readonly areaRepository;
    constructor(cityRepository: Repository<City>, areaRepository: Repository<Area>);
    findAllCities(): Promise<City[]>;
    findAreasByCity(cityId: string): Promise<Area[]>;
    detectCity(lat: number, lon: number): Promise<City>;
}
