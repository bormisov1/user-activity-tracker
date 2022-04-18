import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
export declare class UserService {
    private usersRepository;
    constructor(usersRepository: Repository<UserEntity>);
    findAll(): Promise<UserEntity[]>;
}
