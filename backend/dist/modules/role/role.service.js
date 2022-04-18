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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const crud_typeorm_1 = require("@nestjsx/crud-typeorm");
const typeorm_2 = require("typeorm");
const role_entity_1 = require("./entity/role.entity");
const permission_entity_1 = require("../permission/entity/permission.entity");
let RoleService = class RoleService extends crud_typeorm_1.TypeOrmCrudService {
    constructor(rolesRepository, permissionsRepository) {
        super(rolesRepository);
        this.rolesRepository = rolesRepository;
        this.permissionsRepository = permissionsRepository;
    }
    async createRole(dto) {
        try {
            const permissions = await this.permissionsRepository.find({
                where: { id: (0, typeorm_2.In)(dto.permissionIds) },
            });
            await this.rolesRepository.save({
                name: dto.name,
                permissions: permissions,
            });
            return {
                message: 'New Role has been successfully created.',
            };
        }
        catch (e) {
            throw new common_1.HttpException(String(e), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateRole(req, dto) {
        try {
            const roleId = req.parsed.paramsFilter[0].value;
            const role = await this.rolesRepository.findOne({
                where: { id: roleId },
            });
            if (!role) {
                throw new common_1.HttpException('Role not found', common_1.HttpStatus.NOT_FOUND);
            }
            const permissions = await this.permissionsRepository.find({
                where: { id: (0, typeorm_2.In)(dto.permissionIds) },
            });
            role.name = dto.name;
            role.permissions = permissions;
            await this.rolesRepository.save(role);
            return {
                message: `Role has been updated successsfully.`,
            };
        }
        catch (e) {
            throw new common_1.HttpException(String(e), common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.RoleEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(permission_entity_1.PermissionEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RoleService);
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map