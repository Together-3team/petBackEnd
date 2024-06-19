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
exports.PurchaseResponseDto = void 0;
const class_validator_1 = require("class-validator");
const entities_1 = require("../../entities");
const class_transformer_1 = require("class-transformer");
/**
 * @swagger
 * components:
 *   schemas:
 *     PurchaseResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         deliveryName:
 *           type: string
 *         recipient:
 *           type: string
 *         recipientPhoneNumber:
 *           type: string
 *           example: 010-1234-5678
 *           pattern: ^010-\\d{4}-\\d{4}$
 *         zipCode:
 *           type: integer
 *         address:
 *           type: string
 *         detailedAddress:
 *           type: string
 *         deliveryMessage:
 *           type: string
 *         purchaseProducts:
 *           $ref: '#/components/schemas/PurchaseProductListResponseDto'
 *         orderId:
 *           type: string
 *         paymentKey:
 *           type: string
 *         paymentStatus:
 *           type: integer
 *     PurchaseListResponseDto:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/PurchaseResponseDto'
 */
class PurchaseResponseDto {
}
exports.PurchaseResponseDto = PurchaseResponseDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PurchaseResponseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Object)
], PurchaseResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", entities_1.User)
], PurchaseResponseDto.prototype, "user", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PurchaseResponseDto.prototype, "deliveryName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PurchaseResponseDto.prototype, "recipient", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^010-\d{4}-\d{4}$/, { message: 'phoneNumber must be a valid Korean phone number (010-XXXX-XXXX)' }),
    __metadata("design:type", String)
], PurchaseResponseDto.prototype, "recipientPhoneNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PurchaseResponseDto.prototype, "zipCode", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PurchaseResponseDto.prototype, "address", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PurchaseResponseDto.prototype, "detailedAddress", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PurchaseResponseDto.prototype, "deliveryMessage", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], PurchaseResponseDto.prototype, "purchaseProducts", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PurchaseResponseDto.prototype, "orderId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PurchaseResponseDto.prototype, "paymentKey", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PurchaseResponseDto.prototype, "paymentStatus", void 0);
