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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const enums_1 = require("../enums");
let PermissionGuard = class PermissionGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    async canActivate(context) {
        const resource = this.reflector.get('resource', context.getHandler());
        return await this.checkPermissions(resource, context);
    }
    async checkPermissions(resource, context) {
        if (!resource) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const userRole = request.user.role;
        switch (request.method) {
            case 'GET':
                return userRole.permissions.some((p) => p.name === `${enums_1.PERMISSIONS_PREFIX.READ}${resource}`);
            case 'POST':
                return userRole.permissions.some((p) => p.name === `${enums_1.PERMISSIONS_PREFIX.CREATE}${resource}`);
            case 'PUT':
            case 'PATCH':
                return userRole.permissions.some((p) => p.name === `${enums_1.PERMISSIONS_PREFIX.UPDATE}${resource}`);
            case 'DELETE':
                return userRole.permissions.some((p) => p.name === `${enums_1.PERMISSIONS_PREFIX.DELETE}${resource}`);
        }
    }
};
PermissionGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], PermissionGuard);
exports.PermissionGuard = PermissionGuard;
//# sourceMappingURL=permission.guard.js.map