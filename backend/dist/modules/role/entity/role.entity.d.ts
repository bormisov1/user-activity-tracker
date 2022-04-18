import { PermissionEntity } from '../../permission/entity/permission.entity';
import { UserEntity } from '../../user/entity/user.entity';
export declare class RoleEntity {
    id: number;
    name: string;
    users: UserEntity[];
    permissions: PermissionEntity[];
}
