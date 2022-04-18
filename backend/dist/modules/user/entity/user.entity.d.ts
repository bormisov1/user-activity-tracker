import { UserAuthSessionEntity } from '../../auth/entity/user_auth_session.entity';
import { RoleEntity } from '../../role/entity/role.entity';
export declare class UserEntity {
    id: string;
    email: string;
    password: string;
    role_id: number;
    created_at: Date;
    updated_at: Date;
    auth_sessions: UserAuthSessionEntity[];
    role: RoleEntity;
    toJSON(): Record<string, any>;
}
