import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { RegisterDto, LoginDto } from './dto';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    checkUserExists(identifier: string): Promise<boolean>;
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
        user: Omit<User, 'password'>;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: Omit<User, 'password'>;
    }>;
    validateUser(identifier: string, password: string): Promise<User | null>;
    hashPassword(password: string): Promise<string>;
}
