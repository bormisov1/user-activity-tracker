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
exports.TrackController = void 0;
const common_1 = require("@nestjs/common");
const track_service_1 = require("./track.service");
const dto_1 = require("./dto");
const platform_express_1 = require("@nestjs/platform-express");
let TrackController = class TrackController {
    constructor(trackService) {
        this.trackService = trackService;
    }
    async createTrack(dto) {
        this.trackService.create(dto.tracks);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('tracks')),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateTrackDto]),
    __metadata("design:returntype", Promise)
], TrackController.prototype, "createTrack", null);
TrackController = __decorate([
    (0, common_1.Controller)({ path: 'tracks' }),
    __metadata("design:paramtypes", [track_service_1.TrackService])
], TrackController);
exports.TrackController = TrackController;
//# sourceMappingURL=track.controller.js.map