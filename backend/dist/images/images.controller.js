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
var ImagesController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const images_service_1 = require("./images.service");
const guards_1 = require("../auth/guards");
const multer_config_1 = require("./config/multer.config");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const path_1 = require("path");
class AssociateImageDto {
    url;
    adId;
    order;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AssociateImageDto.prototype, "url", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AssociateImageDto.prototype, "adId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AssociateImageDto.prototype, "order", void 0);
let ImagesController = ImagesController_1 = class ImagesController {
    imagesService;
    logger = new common_1.Logger(ImagesController_1.name);
    constructor(imagesService) {
        this.imagesService = imagesService;
    }
    async uploadImage(file) {
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        this.logger.log(`Uploading image: ${file.originalname}`);
        return this.imagesService.uploadImage(file);
    }
    async associateImage(dto) {
        return this.imagesService.associateImageWithAd(dto.url, dto.adId, dto.order ?? 0);
    }
    async getImage(filename, res) {
        try {
            const filePath = (0, path_1.join)(process.cwd(), 'uploads', 'images', filename);
            this.logger.log(`Serving image: ${filename}`);
            res.sendFile(filePath);
        }
        catch (error) {
            this.logger.error(`Failed to serve image: ${error.message}`);
            throw new common_1.BadRequestException('Image not found');
        }
    }
};
exports.ImagesController = ImagesController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Upload an image' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', multer_config_1.multerConfig)),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImagesController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Post)('associate'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Associate an uploaded image with an ad' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AssociateImageDto]),
    __metadata("design:returntype", Promise)
], ImagesController.prototype, "associateImage", null);
__decorate([
    (0, common_1.Get)(':filename'),
    (0, swagger_1.ApiOperation)({ summary: 'Get image file' }),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ImagesController.prototype, "getImage", null);
exports.ImagesController = ImagesController = ImagesController_1 = __decorate([
    (0, swagger_1.ApiTags)('images'),
    (0, common_1.Controller)('images'),
    __metadata("design:paramtypes", [images_service_1.ImagesService])
], ImagesController);
//# sourceMappingURL=images.controller.js.map