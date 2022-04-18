import { Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import 'dotenv/config';
import { UserEntity } from '../../user/entity/user.entity';
import { IAuthPayload } from '../interfaces';
import { UserAuthSessionEntity } from '../entity/user_auth_session.entity';
declare const JWTStrategy_base: new (...args: any[]) => Strategy;
export declare class JWTStrategy extends JWTStrategy_base {
    private userRepository;
    private userAuthSessionsRepository;
    constructor(userRepository: Repository<UserEntity>, userAuthSessionsRepository: Repository<UserAuthSessionEntity>);
    validate(payload: IAuthPayload): Promise<Record<string, any>>;
}
export {};
