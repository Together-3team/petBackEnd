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
exports.PurchaseProductCreateRequestDto = void 0;
const class_validator_1 = require("class-validator");
/**
 * @swagger
 * components:
 *   schemas:
 *     PurchaseProductCreateRequestDto:
 *       type: object
 *       required:
 *         - purchaseId
 *         - title
 *         - combinationName
 *         - quantity
 *         - originalPrice
 *         - price
 *         - combinationPrice
 *         - thumbNailImage
 *       properties:
 *         purchaseId:
 *           type: integer
 *         title:
 *           type: string
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
 */
class PurchaseProductCreateRequestDto {
}
exports.PurchaseProductCreateRequestDto = PurchaseProductCreateRequestDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PurchaseProductCreateRequestDto.prototype, "purchaseId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PurchaseProductCreateRequestDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PurchaseProductCreateRequestDto.prototype, "combinationName", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PurchaseProductCreateRequestDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PurchaseProductCreateRequestDto.prototype, "originalPrice", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PurchaseProductCreateRequestDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PurchaseProductCreateRequestDto.prototype, "combinationPrice", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Number)
], PurchaseProductCreateRequestDto.prototype, "thumbNailImage", void 0);
