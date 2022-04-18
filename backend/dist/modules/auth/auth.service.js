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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const utils_1 = require("../../shared/utils");
const user_entity_1 = require("../user/entity/user.entity");
const jwt = require("jsonwebtoken");
require("dotenv/config");
const user_auth_session_entity_1 = require("./entity/user_auth_session.entity");
let AuthService = class AuthService {
    constructor(usersRepository, userAuthSessionsRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.userAuthSessionsRepository = userAuthSessionsRepository;
        this.jwtService = jwtService;
    }
    async login(dto) {
        const user = await this.usersRepository.findOne({
            where: { email: dto.email },
            relations: ['role'],
        });
        if (!user) {
            throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.BAD_REQUEST);
        }
        const isValid = await (0, utils_1.comparePassword)(dto.password, user.password);
        if (!isValid) {
            throw new common_1.HttpException('Invalid credentials.', common_1.HttpStatus.BAD_REQUEST);
        }
        const authpayload = {
            id: user.id,
        };
        const token = await this.getTokens(authpayload);
        return {
            user: user.toJSON(),
            access_token: token.access_token,
            refresh_token: token.refresh_token,
        };
    }
    async register(dto) {
        let user = await this.usersRepository.findOne({
            where: { email: dto.email },
        });
        if (user) {
            throw new common_1.HttpException('Email already used.', common_1.HttpStatus.BAD_REQUEST);
        }
        let hashedPassword = await (0, utils_1.hashPassword)(dto.password);
        dto = Object.assign(Object.assign({}, dto), { password: hashedPassword });
        user = await this.usersRepository.create(dto);
        await this.usersRepository.save(user);
        return {
            user: user,
            message: 'Registration successful.',
        };
    }
    async refresh(refresh_token) {
        try {
            jwt.verify(refresh_token, process.env.JWT_REFRESH_TOKEN_SECRET);
            const data = jwt.decode(refresh_token);
            const session = await this.userAuthSessionsRepository.findOne({
                where: { user_id: data['id'] },
            });
            if (session && session.refresh_token === refresh_token) {
                const payload = {
                    id: data['id'],
                };
                const token = await this.getTokens(payload);
                return {
                    access_token: token.access_token,
                    refresh_token: token.refresh_token,
                };
            }
            else {
                throw 'Invalid refresh token.';
            }
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async logout(currentUser) {
        const session = await this.userAuthSessionsRepository.delete({
            user_id: currentUser.id,
        });
        return {
            message: 'Logged out successfully.',
        };
    }
    async getTokens(payload) {
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN });
        const session = await this.userAuthSessionsRepository.findOne({
            where: { user_id: payload.id },
        });
        if (session) {
            await this.userAuthSessionsRepository.update({ id: session.id }, {
                access_token: accessToken,
                refresh_token: refreshToken,
            });
        }
        else {
            await this.userAuthSessionsRepository.save({
                user_id: payload.id,
                access_token: accessToken,
                refresh_token: refreshToken,
            });
        }
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_auth_session_entity_1.UserAuthSessionEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map