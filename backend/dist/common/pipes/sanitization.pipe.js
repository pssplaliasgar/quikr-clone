"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SanitizationPipe = void 0;
const common_1 = require("@nestjs/common");
let SanitizationPipe = class SanitizationPipe {
    transform(value, metadata) {
        if (typeof value === 'string') {
            return this.sanitizeString(value);
        }
        if (typeof value === 'object' && value !== null) {
            return this.sanitizeObject(value);
        }
        return value;
    }
    sanitizeString(str) {
        return str
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/<[^>]+>/g, '')
            .replace(/javascript:/gi, '')
            .replace(/on\w+\s*=/gi, '');
    }
    sanitizeObject(obj) {
        const sanitized = Array.isArray(obj) ? [] : {};
        for (const key of Object.keys(obj)) {
            const value = obj[key];
            if (typeof value === 'string') {
                sanitized[key] = this.sanitizeString(value);
            }
            else if (typeof value === 'object' && value !== null) {
                sanitized[key] = this.sanitizeObject(value);
            }
            else {
                sanitized[key] = value;
            }
        }
        return sanitized;
    }
};
exports.SanitizationPipe = SanitizationPipe;
exports.SanitizationPipe = SanitizationPipe = __decorate([
    (0, common_1.Injectable)()
], SanitizationPipe);
//# sourceMappingURL=sanitization.pipe.js.map