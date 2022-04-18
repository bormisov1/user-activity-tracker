"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const crud_typeorm_1 = require("@nestjsx/crud-typeorm");
const typeorm_2 = require("typeorm");
const permission_entity_1 = require("./entity/permission.entity");
const enums_1 = require("./enums");
let PermissionService = class PermissionService extends crud_typeorm_1.TypeOrmCrudService {
    constructor(permissionsRepository) {
        super(permissionsRepository);
        this.permissionsRepository = permissionsRepository;
    }
    async createPermission(dto) {
        try {
            const permissionsPrefix = Object.values(enums_1.PERMISSIONS_PREFIX);
            const routeResources = Object.values(enums_1.ROUTE_RESOURCE);
            const p = dto.name.split('_');
            if (!permissionsPrefix.includes(`${p[0]}_`) ||
                !routeResources.includes(p[1])) {
                throw new common_1.HttpException('Inavlid permission. The format must be a valid <prefix>_<resource>', common_1.HttpStatus.BAD_REQUEST);
            }
            const permission = await this.permissionsRepository.create(dto);
            await this.permissionsRepository.save(permission);
            return {
                message: 'New permission has been successfully created.',
            };
        }
        catch (e) {
            throw new common_1.HttpException(e.details || String(e), common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
PermissionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(permission_entity_1.PermissionEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PermissionService);
exports.PermissionService = PermissionService;
//# sourceMappingURL=permission.service.js.map