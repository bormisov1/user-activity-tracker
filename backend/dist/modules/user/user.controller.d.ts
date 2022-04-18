import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    findAll(): Promise<import("./entity/user.entity").UserEntity[]>;
}
