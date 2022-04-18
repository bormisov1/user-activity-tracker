import { UserEntity } from '../../user/entity/user.entity';
export declare class UserAuthSessionEntity {
    id: string;
    user_id: string;
    access_token: string;
    refresh_token: string;
    created_at: Date;
    updated_at: Date;
    user: UserEntity;
}
