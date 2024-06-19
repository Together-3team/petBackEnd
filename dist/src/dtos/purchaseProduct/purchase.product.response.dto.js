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
exports.PurchaseProductResponseDto = void 0;
const class_validator_1 = require("class-validator");
const entities_1 = require("../../entities");
const class_transformer_1 = require("class-transformer");
/**
 * @swagger
 * components:
 *   schemas:
 *     PurchaseProductResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         status:
 *           type: integer
 *         combinationName:
 *           type: string
 *         quantity:
 *           type: integer
 *         originalPrice:
 *           type: integer
 *         price:
 *           type: integer
 *         combinationPrice:
 *           type: integer
 *         thumbNailImage:
 *           type: string
 *         deliveryCompany:
 *           type: string
 *         trackingNumber:
 *           type: string
 *         productId:
 *           type: integer
 *     PurchaseProductListResponseDto:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/PurchaseProductResponseDto'
 */
class PurchaseProductResponseDto {
    constructor() {
        this.status = 0;
    }
}
exports.PurchaseProductResponseDto = PurchaseProductResponseDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PurchaseProductResponseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Object)
], PurchaseProductResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", entities_1.User)
], PurchaseProductResponseDto.prototype, "user", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", entities_1.GroupBuying)
], PurchaseProductResponseDto.prototype, "groupBuying", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", entities_1.Purchase)
], PurchaseProductResponseDto.prototype, "purchase", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PurchaseProductResponseDto.prototype, "title", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PurchaseProductResponseDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PurchaseProductResponseDto.prototype, "combinationName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PurchaseProductResponseDto.prototype, "quantity", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PurchaseProductResponseDto.prototype, "originalPrice", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PurchaseProductResponseDto.prototype, "price", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PurchaseProductResponseDto.prototype, "combinationPrice", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PurchaseProductResponseDto.prototype, "thumbNailImage", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PurchaseProductResponseDto.prototype, "deliveryCompany", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PurchaseProductResponseDto.prototype, "trackingNumber", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PurchaseProductResponseDto.prototype, "productId", void 0);
