"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerConfig = void 0;
const multer_1 = require("multer");
const path_1 = require("path");
const uuid_1 = require("uuid");
const common_1 = require("@nestjs/common");
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024;
exports.multerConfig = {
    storage: (0, multer_1.diskStorage)({
        destination: './uploads/images',
        filename: (req, file, callback) => {
            const uniqueFilename = `${(0, uuid_1.v4)()}${(0, path_1.extname)(file.originalname)}`;
            callback(null, uniqueFilename);
        },
    }),
    fileFilter: (req, file, callback) => {
        if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
            return callback(new common_1.BadRequestException('Invalid file type. Only JPEG, PNG, and WebP images are allowed.'), false);
        }
        callback(null, true);
    },
    limits: {
        fileSize: MAX_FILE_SIZE,
    },
};
//# sourceMappingURL=multer.config.js.map