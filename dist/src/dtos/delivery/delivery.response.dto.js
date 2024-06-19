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
exports.DeliveryResponseDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const entities_1 = require("../../entities");
/**
 * @swagger
 * components:
 *   schemas:
 *     DeliveryResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         recipient:
 *           type: string
 *         recipientPhoneNumber:
 *           type: string
 *           example: 010-1234-5678
 *           pattern: ^010-\\d{4}-\\d{4}$
 *         zipCode:
 *           type: number
 *         address:
 *           type: string
 *         detailedAddress:
 *           type: string
 *         isDefault:
 *           type: boolean
 *     DeliveryListResponseDto:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/DeliveryResponseDto'
 */
class DeliveryResponseDto {
}
exports.DeliveryResponseDto = DeliveryResponseDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DeliveryResponseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DeliveryResponseDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DeliveryResponseDto.prototype, "recipient", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^010-\d{4}-\d{4}$/, { message: 'phoneNumber must be a valid Korean phone number (010-XXXX-XXXX)' }),
    __metadata("design:type", String)
], DeliveryResponseDto.prototype, "recipientPhoneNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DeliveryResponseDto.prototype, "zipCode", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DeliveryResponseDto.prototype, "address", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DeliveryResponseDto.prototype, "detailedAddress", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], DeliveryResponseDto.prototype, "isDefault", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", typeorm_1.Timestamp)
], DeliveryResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", entities_1.User)
], DeliveryResponseDto.prototype, "user", void 0);
