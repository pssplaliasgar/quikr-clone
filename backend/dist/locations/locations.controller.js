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
exports.LocationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const locations_service_1 = require("./locations.service");
const dto_1 = require("./dto");
const entities_1 = require("./entities");
let LocationsController = class LocationsController {
    locationsService;
    constructor(locationsService) {
        this.locationsService = locationsService;
    }
    async findAllCities() {
        return this.locationsService.findAllCities();
    }
    async findAreasByCity(cityId) {
        return this.locationsService.findAreasByCity(cityId);
    }
    async detectCity(detectCityDto) {
        return this.locationsService.detectCity(detectCityDto.lat, detectCityDto.lon);
    }
};
exports.LocationsController = LocationsController;
__decorate([
    (0, common_1.Get)('cities'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all cities' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns all cities with their state information',
        type: [entities_1.City],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "findAllCities", null);
__decorate([
    (0, common_1.Get)('cities/:id/areas'),
    (0, swagger_1.ApiOperation)({ summary: 'Get areas by city' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'City UUID',
        type: 'string',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns all areas for the specified city',
        type: [entities_1.Area],
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'City not found',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "findAreasByCity", null);
__decorate([
    (0, common_1.Post)('detect'),
    (0, swagger_1.ApiOperation)({ summary: 'Detect city from coordinates' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns the detected city based on coordinates',
        type: entities_1.City,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Unable to detect city from coordinates',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.DetectCityDto]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "detectCity", null);
exports.LocationsController = LocationsController = __decorate([
    (0, swagger_1.ApiTags)('locations'),
    (0, common_1.Controller)('locations'),
    __metadata("design:paramtypes", [locations_service_1.LocationsService])
], LocationsController);
//# sourceMappingURL=locations.controller.js.map