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
exports.AuthNotRegisteredResponseDto = void 0;
const class_validator_1 = require("class-validator");
/**
 * @swagger
 * components:
 *   schemas:
 *     AuthNotRegisteredResponseDto:
 *       type: object
 *       properties:
 *         registered:
 *           type: boolean
 *           description: 회원 가입 여부
 *         email:
 *           type: string
 *           format: email
 *           description: 이메일
 *         profileToken:
 *           type: string
 *           description: 프로필 정보 토큰
 */
class AuthNotRegisteredResponseDto {
}
exports.AuthNotRegisteredResponseDto = AuthNotRegisteredResponseDto;
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AuthNotRegisteredResponseDto.prototype, "registered", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], AuthNotRegisteredResponseDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthNotRegisteredResponseDto.prototype, "profileToken", void 0);
