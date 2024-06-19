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
exports.OptionCombinationResponseDto = void 0;
const class_validator_1 = require("class-validator");
const product_1 = require("../product");
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
/**
 * @swagger
 * components:
 *   schemas:
 *     OptionCombinationResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         product:
 *           $ref: '#/components/schemas/ProductResponseDto'
 *         optionCombination:
 *           type: string
 *         combinationName:
 *           type: string
 *         combinationPrice:
 *           type: integer
 *         amount:
 *           type: integer
 */
class OptionCombinationResponseDto {
}
exports.OptionCombinationResponseDto = OptionCombinationResponseDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], OptionCombinationResponseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", product_1.ProductResponseDto)
], OptionCombinationResponseDto.prototype, "product", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OptionCombinationResponseDto.prototype, "optionCombination", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OptionCombinationResponseDto.prototype, "combinationName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], OptionCombinationResponseDto.prototype, "combinationPrice", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], OptionCombinationResponseDto.prototype, "amount", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", typeorm_1.Timestamp)
], OptionCombinationResponseDto.prototype, "createdAt", void 0);
