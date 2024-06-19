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
exports.UserCreateRequestDto = void 0;
const class_validator_1 = require("class-validator");
/**
 * @swagger
 * components:
 *   schemas:
 *     UserCreateRequestDto:
 *       type: object
 *       properties:
 *         nickname:
 *           type: string
 *           description: 사용자 닉네임
 *         email:
 *           type: string
 *           format: email
 *           description: 사용자 이메일 주소
 *         phoneNumber:
 *           type: string
 *           example: 010-1234-5678
 *           pattern: ^010-\\d{4}-\\d{4}$
 *           description: 사용자 휴대폰 번호
 *         profileImage:
 *           type: string
 *           format: uri
 *           description: 사용자 프로필 이미지
 *         snsId:
 *           type: string
 *           description: 플랫폼 ID
 *         provider:
 *           type: string
 *           description: 로그인 플랫폼
 *         isSubscribedToPromotions:
 *           type: boolean
 *           description: 광고성 정보 수신 여부
 */
class UserCreateRequestDto {
}
exports.UserCreateRequestDto = UserCreateRequestDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserCreateRequestDto.prototype, "nickname", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UserCreateRequestDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^010-\d{4}-\d{4}$/, { message: 'phoneNumber must be a valid Korean phone number (010-XXXX-XXXX)' }),
    __metadata("design:type", String)
], UserCreateRequestDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UserCreateRequestDto.prototype, "profileImage", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserCreateRequestDto.prototype, "snsId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserCreateRequestDto.prototype, "provider", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UserCreateRequestDto.prototype, "isSubscribedToPromotions", void 0);
