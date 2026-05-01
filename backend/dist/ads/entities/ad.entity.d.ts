import { User } from '../../users/entities/user.entity';
import { LeafCategory } from '../../categories/entities/leaf-category.entity';
import { City } from '../../locations/entities/city.entity';
import { Area } from '../../locations/entities/area.entity';
export declare class Ad {
    id: string;
    title: string;
    description: string;
    price: number;
    user: User;
    userId: string;
    category: LeafCategory;
    categoryId: string;
    city: City;
    cityId: string;
    area: Area;
    areaId: string;
    views: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    images: any[];
}
