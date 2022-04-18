import { CrudController, CrudRequest } from '@nestjsx/crud';
import { RoleEntity } from './entity/role.entity';
import { RoleService } from './role.service';
import { CreateRoleDTO, UpdateRoleDTO } from './dto';
export declare class RoleController implements CrudController<RoleEntity> {
    service: RoleService;
    constructor(service: RoleService);
    get base(): CrudController<RoleEntity>;
    createRole(dto: CreateRoleDTO): Promise<{
        message: string;
    }>;
    updateRole(req: CrudRequest, dto: UpdateRoleDTO): Promise<{
        message: string;
    }>;
}
