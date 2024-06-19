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
exports.PurchaseCreateRequestDto = void 0;
const class_validator_1 = require("class-validator");
/**
 * @swagger
 * components:
 *   schemas:
 *     PurchaseCreateRequestDto:
 *       type: object
 *       required:
 *         - deliveryId
 *         - selectedProductIds
 *         - orderId
 *         - paymentKey
 *       properties:
 *         deliveryId:
 *           type: integer
 *           description: 배송지 ID
 *         selectedProductIds:
 *           type: array
 *           items:
 *             type: integer
 *         orderId:
 *           type: string
 *         paymentKey:
 *           type: string
 *         deliveryMessage:
 *           type: string
 */
class PurchaseCreateRequestDto {
}
exports.PurchaseCreateRequestDto = PurchaseCreateRequestDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PurchaseCreateRequestDto.prototype, "deliveryId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    __metadata("design:type", Array)
], PurchaseCreateRequestDto.prototype, "selectedProductIds", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PurchaseCreateRequestDto.prototype, "orderId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PurchaseCreateRequestDto.prototype, "paymentKey", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PurchaseCreateRequestDto.prototype, "deliveryMessage", void 0);
