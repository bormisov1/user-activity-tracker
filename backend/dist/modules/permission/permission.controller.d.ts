import { CrudController } from '@nestjsx/crud';
import { CreatePermissionDTO } from './dto';
import { PermissionEntity } from './entity/permission.entity';
import { PERMISSIONS_PREFIX, ROUTE_RESOURCE } from './enums';
import { PermissionService } from './permission.service';
export declare class PermissionController implements CrudController<PermissionEntity> {
    service: PermissionService;
    constructor(service: PermissionService);
    get base(): CrudController<PermissionEntity>;
    createRole(dto: CreatePermissionDTO): Promise<{
        message: string;
    }>;
    listAllPermisionPrefix(): PERMISSIONS_PREFIX[];
    listAllRouteResource(): ROUTE_RESOURCE[];
}
