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
exports.PermissionController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("@nestjsx/crud");
const decorators_1 = require("./decorators");
const dto_1 = require("./dto");
const permission_entity_1 = require("./entity/permission.entity");
const enums_1 = require("./enums");
const guards_1 = require("./guards");
const permission_service_1 = require("./permission.service");
let PermissionController = class PermissionController {
    constructor(service) {
        this.service = service;
    }
    get base() {
        return this;
    }
    async createRole(dto) {
        return await this.service.createPermission(dto);
    }
    listAllPermisionPrefix() {
        const permissionsPrefix = enums_1.PERMISSIONS_PREFIX;
        return Object.values(permissionsPrefix);
    }
    listAllRouteResource() {
        const routeResources = enums_1.ROUTE_RESOURCE;
        return Object.values(routeResources);
    }
};
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), guards_1.PermissionGuard),
    (0, decorators_1.HasPermissionDecorator)(enums_1.ROUTE_RESOURCE.PERMISSIONS),
    (0, crud_1.Override)('createOneBase'),
    __param(0, (0, crud_1.ParsedBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreatePermissionDTO]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "createRole", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), guards_1.PermissionGuard),
    (0, decorators_1.HasPermissionDecorator)(enums_1.ROUTE_RESOURCE.PERMISSIONS),
    (0, common_1.Get)('prefixes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PermissionController.prototype, "listAllPermisionPrefix", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), guards_1.PermissionGuard),
    (0, decorators_1.HasPermissionDecorator)(enums_1.ROUTE_RESOURCE.PERMISSIONS),
    (0, common_1.Get)('resources'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PermissionController.prototype, "listAllRouteResource", null);
PermissionController = __decorate([
    (0, crud_1.Crud)({
        model: {
            type: permission_entity_1.PermissionEntity,
        },
        routes: {
            exclude: [
                'createManyBase',
                'replaceOneBase',
                'updateOneBase',
                'getOneBase',
            ],
            getManyBase: {
                decorators: [(0, decorators_1.HasPermissionDecorator)(enums_1.ROUTE_RESOURCE.PERMISSIONS)],
            },
            deleteOneBase: {
                decorators: [(0, decorators_1.HasPermissionDecorator)(enums_1.ROUTE_RESOURCE.PERMISSIONS)],
            },
        },
        dto: {
            create: dto_1.CreatePermissionDTO,
        },
    }),
    (0, swagger_1.ApiTags)('Permissions'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), guards_1.PermissionGuard),
    (0, common_1.Controller)('permission'),
    __metadata("design:paramtypes", [permission_service_1.PermissionService])
], PermissionController);
exports.PermissionController = PermissionController;
//# sourceMappingURL=permission.controller.js.map