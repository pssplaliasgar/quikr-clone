import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Ad } from '../ads/entities/ad.entity';
import { UpdateUserDto } from './dto';
export declare class UsersService {
    private readonly userRepository;
    private readonly adRepository;
    constructor(userRepository: Repository<User>, adRepository: Repository<Ad>);
    findById(id: string): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findByPhone(phone: string): Promise<User | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    getUserAds(userId: string): Promise<Ad[]>;
}
