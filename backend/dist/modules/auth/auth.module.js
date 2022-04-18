"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/entity/user.entity");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const user_auth_session_entity_1 = require("./entity/user_auth_session.entity");
const strategies_1 = require("./strategies");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, user_auth_session_entity_1.UserAuthSessionEntity]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: {
                    expiresIn: process.env.JWT_EXPIRES_IN,
                },
            }),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, strategies_1.JWTStrategy],
        exports: [passport_1.PassportModule, strategies_1.JWTStrategy, auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map