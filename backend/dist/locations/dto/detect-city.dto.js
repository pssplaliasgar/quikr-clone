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
exports.DetectCityDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class DetectCityDto {
    lat;
    lon;
}
exports.DetectCityDto = DetectCityDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Latitude coordinate',
        example: 28.7041,
        minimum: -90,
        maximum: 90,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(-90),
    (0, class_validator_1.Max)(90),
    __metadata("design:type", Number)
], DetectCityDto.prototype, "lat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Longitude coordinate',
        example: 77.1025,
        minimum: -180,
        maximum: 180,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(-180),
    (0, class_validator_1.Max)(180),
    __metadata("design:type", Number)
], DetectCityDto.prototype, "lon", void 0);
//# sourceMappingURL=detect-city.dto.js.map