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
exports.DeliveryUpdateRequestDto = void 0;
const class_validator_1 = require("class-validator");
/**
 * @swagger
 * components:
 *   schemas:
 *     DeliveryUpdateRequestDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: 배송지명
 *         recipient:
 *           type: string
 *           description: 수령인
 *         recipientPhoneNumber:
 *           type: string
 *           example: 010-1234-5678
 *           pattern: ^010-\\d{4}-\\d{4}$
 *           description: 수령인 연락처
 *         zipCode:
 *           type: integer
 *           description: 우편 번호
 *         address:
 *           type: string
 *           description: 주소지
 *         detailedAddress:
 *           type: string
 *           description: 상세 주소
 *         isDefault:
 *           type: boolean
 *           description: 기본 배송지 여부
 */
class DeliveryUpdateRequestDto {
}
exports.DeliveryUpdateRequestDto = DeliveryUpdateRequestDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DeliveryUpdateRequestDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DeliveryUpdateRequestDto.prototype, "recipient", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^010-\d{4}-\d{4}$/, { message: 'phoneNumber must be a valid Korean phone number (010-XXXX-XXXX)' }),
    __metadata("design:type", String)
], DeliveryUpdateRequestDto.prototype, "recipientPhoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DeliveryUpdateRequestDto.prototype, "zipCode", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DeliveryUpdateRequestDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DeliveryUpdateRequestDto.prototype, "detailedAddress", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], DeliveryUpdateRequestDto.prototype, "isDefault", void 0);
