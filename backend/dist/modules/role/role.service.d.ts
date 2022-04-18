import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDTO, UpdateRoleDTO } from './dto';
import { RoleEntity } from './entity/role.entity';
import { PermissionEntity } from '../permission/entity/permission.entity';
import { CrudRequest } from '@nestjsx/crud';
export declare class RoleService extends TypeOrmCrudService<RoleEntity> {
    private rolesRepository;
    private permissionsRepository;
    constructor(rolesRepository: Repository<RoleEntity>, permissionsRepository: Repository<PermissionEntity>);
    createRole(dto: CreateRoleDTO): Promise<{
        message: string;
    }>;
    updateRole(req: CrudRequest, dto: UpdateRoleDTO): Promise<{
        message: string;
    }>;
}
