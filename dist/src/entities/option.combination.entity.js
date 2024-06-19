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
exports.OptionCombination = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
/**
 * @swagger
 * components:
 *   schemas:
 *     OptionCombination:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 고유 ID
 *         optionCombination:
 *           type: string
 *           maxLength: 15
 *           description: 옵션 조합
 *         combinationPrice:
 *           type: integer
 *           description: 조합 가격
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: 생성일
 *         product:
 *           $ref: '#/components/schemas/product'
 */
let OptionCombination = class OptionCombination {
};
exports.OptionCombination = OptionCombination;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OptionCombination.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 15 }),
    __metadata("design:type", String)
], OptionCombination.prototype, "optionCombination", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], OptionCombination.prototype, "combinationPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], OptionCombination.prototype, "combinationName", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeorm_1.Timestamp)
], OptionCombination.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], OptionCombination.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.Product, product => product.optionCombinations, { nullable: true }),
    __metadata("design:type", entities_1.Product)
], OptionCombination.prototype, "product", void 0);
exports.OptionCombination = OptionCombination = __decorate([
    (0, typeorm_1.Entity)()
], OptionCombination);
