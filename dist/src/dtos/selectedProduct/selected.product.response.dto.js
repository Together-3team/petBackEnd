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
exports.SelectedProductResponseDto = void 0;
const class_validator_1 = require("class-validator");
const optionCombination_1 = require("../optionCombination");
const class_transformer_1 = require("class-transformer");
const entities_1 = require("../../entities");
const typeorm_1 = require("typeorm");
/**
 * @swagger
 * components:
 *   schemas:
 *     SelectedProductResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         optionCombination:
 *           $ref: '#/components/schemas/OptionCombinationResponseDto'
 *         quantity:
 *           type: integer
 *     SelectedProductListResponseDto:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/SelectedProductResponseDto'
 */
class SelectedProductResponseDto {
}
exports.SelectedProductResponseDto = SelectedProductResponseDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], SelectedProductResponseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", optionCombination_1.OptionCombinationResponseDto)
], SelectedProductResponseDto.prototype, "optionCombination", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], SelectedProductResponseDto.prototype, "quantity", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], SelectedProductResponseDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", typeorm_1.Timestamp)
], SelectedProductResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", entities_1.GroupBuying)
], SelectedProductResponseDto.prototype, "groupBuying", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", entities_1.User)
], SelectedProductResponseDto.prototype, "user", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", entities_1.Purchase)
], SelectedProductResponseDto.prototype, "purchase", void 0);
