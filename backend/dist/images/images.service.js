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
var ImagesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("./entities");
const config_1 = require("@nestjs/config");
const promises_1 = require("fs/promises");
const path_1 = require("path");
let ImagesService = ImagesService_1 = class ImagesService {
    imageRepository;
    configService;
    logger = new common_1.Logger(ImagesService_1.name);
    uploadsDir = './uploads/images';
    constructor(imageRepository, configService) {
        this.imageRepository = imageRepository;
        this.configService = configService;
    }
    async uploadImage(file, adId, order = 0) {
        this.validateImage(file);
        const baseUrl = this.configService.get('BASE_URL') || 'http://localhost:4000';
        const url = `${baseUrl}/uploads/images/${file.filename}`;
        const image = this.imageRepository.create({
            filename: file.filename,
            path: file.path,
            url,
            adId,
            order,
        });
        const savedImage = await this.imageRepository.save(image);
        this.logger.log(`Image uploaded successfully: ${savedImage.id}`);
        return savedImage;
    }
    validateImage(file) {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
        const maxSize = 5 * 1024 * 1024;
        if (!allowedMimeTypes.includes(file.mimetype)) {
            throw new common_1.BadRequestException('Invalid file type. Only JPEG, PNG, and WebP images are allowed.');
        }
        if (file.size > maxSize) {
            throw new common_1.BadRequestException('File size exceeds the maximum limit of 5MB.');
        }
        this.logger.log(`Image validation passed: ${file.filename}`);
    }
    async deleteImage(id) {
        const image = await this.imageRepository.findOne({ where: { id } });
        if (!image) {
            throw new common_1.NotFoundException(`Image with ID ${id} not found`);
        }
        try {
            const filePath = (0, path_1.join)(process.cwd(), image.path);
            await (0, promises_1.unlink)(filePath);
            this.logger.log(`Image file deleted: ${filePath}`);
        }
        catch (error) {
            this.logger.error(`Failed to delete image file: ${error.message}`);
        }
        await this.imageRepository.remove(image);
        this.logger.log(`Image record deleted: ${id}`);
    }
    async findById(id) {
        const image = await this.imageRepository.findOne({ where: { id } });
        if (!image) {
            throw new common_1.NotFoundException(`Image with ID ${id} not found`);
        }
        return image;
    }
    async findByAdId(adId) {
        return this.imageRepository.find({
            where: { adId },
            order: { order: 'ASC' },
        });
    }
    async associateImageWithAd(url, adId, order = 0) {
        const image = await this.imageRepository.findOne({ where: { url } });
        if (!image) {
            throw new common_1.NotFoundException(`Image with URL not found`);
        }
        image.adId = adId;
        image.order = order;
        const saved = await this.imageRepository.save(image);
        this.logger.log(`Image ${saved.id} associated with ad ${adId}`);
        return saved;
    }
    async deleteByAdId(adId) {
        const images = await this.findByAdId(adId);
        for (const image of images) {
            await this.deleteImage(image.id);
        }
        this.logger.log(`All images deleted for ad: ${adId}`);
    }
};
exports.ImagesService = ImagesService;
exports.ImagesService = ImagesService = ImagesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Image)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], ImagesService);
//# sourceMappingURL=images.service.js.map