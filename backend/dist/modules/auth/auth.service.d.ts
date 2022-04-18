import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { LoginDTO, RegisterDTO } from './dto';
import 'dotenv/config';
import { UserAuthSessionEntity } from './entity/user_auth_session.entity';
export declare class AuthService {
    private usersRepository;
    private userAuthSessionsRepository;
    private jwtService;
    constructor(usersRepository: Repository<UserEntity>, userAuthSessionsRepository: Repository<UserAuthSessionEntity>, jwtService: JwtService);
    login(dto: LoginDTO): Promise<{
        user: Record<string, any>;
        access_token: string;
        refresh_token: string;
    }>;
    register(dto: RegisterDTO): Promise<{
        user: UserEntity;
        message: string;
    }>;
    refresh(refresh_token: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    logout(currentUser: UserEntity): Promise<{
        message: string;
    }>;
    private getTokens;
}
