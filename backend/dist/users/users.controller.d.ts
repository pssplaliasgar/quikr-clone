import { UsersService } from './users.service';
import { UpdateUserDto } from './dto';
import { User } from './entities/user.entity';
import { Ad } from '../ads/entities/ad.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): Promise<User>;
    updateProfile(req: any, updateUserDto: UpdateUserDto): Promise<User>;
    getUserAds(id: string): Promise<Ad[]>;
}
