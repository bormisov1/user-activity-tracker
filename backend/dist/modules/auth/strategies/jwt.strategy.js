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
exports.JWTStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
require("dotenv/config");
const user_entity_1 = require("../../user/entity/user.entity");
const user_auth_session_entity_1 = require("../entity/user_auth_session.entity");
let JWTStrategy = class JWTStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    constructor(userRepository, userAuthSessionsRepository) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
            secretOrKey: process.env.JWT_SECRET,
        });
        this.userRepository = userRepository;
        this.userAuthSessionsRepository = userAuthSessionsRepository;
    }
    async validate(payload) {
        const { id } = payload;
        const user = await this.userRepository.findOne({
            where: { id: id },
            relations: ['role', 'role.permissions'],
        });
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        const session = await this.userAuthSessionsRepository.findOne({
            where: { user_id: user.id },
        });
        if (!session) {
            throw new common_1.UnauthorizedException();
        }
        return await user.toJSON();
    }
};
JWTStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_auth_session_entity_1.UserAuthSessionEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], JWTStrategy);
exports.JWTStrategy = JWTStrategy;
//# sourceMappingURL=jwt.strategy.js.map