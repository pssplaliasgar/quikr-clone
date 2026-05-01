import { LocationsService } from './locations.service';
import { DetectCityDto } from './dto';
import { City, Area } from './entities';
export declare class LocationsController {
    private readonly locationsService;
    constructor(locationsService: LocationsService);
    findAllCities(): Promise<City[]>;
    findAreasByCity(cityId: string): Promise<Area[]>;
    detectCity(detectCityDto: DetectCityDto): Promise<City>;
}
