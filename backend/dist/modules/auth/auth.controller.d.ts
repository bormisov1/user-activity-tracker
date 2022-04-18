import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './dto';
import { Request } from 'express';
import { UserEntity } from '../user/entity/user.entity';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDTO): Promise<{
        user: UserEntity;
        message: string;
    }>;
    login(dto: LoginDTO): Promise<{
        user: Record<string, any>;
        access_token: string;
        refresh_token: string;
    }>;
    me(user: UserEntity): Promise<UserEntity>;
    refresh(req: Request): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    logout(currentUser: UserEntity): Promise<{
        message: string;
    }>;
}
