import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionDTO } from './dto';
import { PermissionEntity } from './entity/permission.entity';
export declare class PermissionService extends TypeOrmCrudService<PermissionEntity> {
    private permissionsRepository;
    constructor(permissionsRepository: Repository<PermissionEntity>);
    createPermission(dto: CreatePermissionDTO): Promise<{
        message: string;
    }>;
}
