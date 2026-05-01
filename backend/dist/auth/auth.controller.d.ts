import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CheckUserDto, RegisterDto, LoginDto } from './dto';
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    checkUser(checkUserDto: CheckUserDto): Promise<{
        exists: boolean;
    }>;
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
        user: Omit<import("../users").User, "password">;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: Omit<import("../users").User, "password">;
    }>;
    getProfile(req: any): Promise<import("../users").User>;
}
