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
exports.RoleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("@nestjsx/crud");
const role_entity_1 = require("./entity/role.entity");
const role_service_1 = require("./role.service");
const dto_1 = require("./dto");
const decorators_1 = require("../permission/decorators");
const enums_1 = require("../permission/enums");
const passport_1 = require("@nestjs/passport");
const guards_1 = require("../permission/guards");
let RoleController = class RoleController {
    constructor(service) {
        this.service = service;
    }
    get base() {
        return this;
    }
    async createRole(dto) {
        return await this.service.createRole(dto);
    }
    async updateRole(req, dto) {
        return await this.service.updateRole(req, dto);
    }
};
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), guards_1.PermissionGuard),
    (0, decorators_1.HasPermissionDecorator)(enums_1.ROUTE_RESOURCE.ROLES),
    (0, crud_1.Override)('createOneBase'),
    __param(0, (0, crud_1.ParsedBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateRoleDTO]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "createRole", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), guards_1.PermissionGuard),
    (0, decorators_1.HasPermissionDecorator)(enums_1.ROUTE_RESOURCE.ROLES),
    (0, crud_1.Override)('updateOneBase'),
    __param(0, (0, crud_1.ParsedRequest)()),
    __param(1, (0, crud_1.ParsedBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.UpdateRoleDTO]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "updateRole", null);
RoleController = __decorate([
    (0, crud_1.Crud)({
        model: {
            type: role_entity_1.RoleEntity,
        },
        routes: {
            exclude: ['createManyBase', 'replaceOneBase'],
            getOneBase: {
                decorators: [(0, decorators_1.HasPermissionDecorator)(enums_1.ROUTE_RESOURCE.ROLES)],
            },
            getManyBase: {
                decorators: [(0, decorators_1.HasPermissionDecorator)(enums_1.ROUTE_RESOURCE.ROLES)],
            },
            deleteOneBase: {
                decorators: [(0, decorators_1.HasPermissionDecorator)(enums_1.ROUTE_RESOURCE.ROLES)],
            },
        },
        query: {
            join: {
                permissions: {
                    eager: false,
                },
            },
            sort: [
                {
                    field: 'id',
                    order: 'DESC',
                },
            ],
        },
        dto: {
            create: dto_1.CreateRoleDTO,
            update: dto_1.UpdateRoleDTO,
        },
    }),
    (0, swagger_1.ApiTags)('Roles'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), guards_1.PermissionGuard),
    (0, common_1.Controller)('role'),
    __metadata("design:paramtypes", [role_service_1.RoleService])
], RoleController);
exports.RoleController = RoleController;
//# sourceMappingURL=role.controller.js.map