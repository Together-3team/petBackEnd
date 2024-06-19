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
exports.SelectedProduct = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
/**
 * @swagger
 * components:
 *   schemas:
 *     SelectedProduct:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 고유 ID
 *         user:
 *           $ref: '#/components/schemas/User'
 *         optionCombination:
 *           $ref: '#/components/schemas/OptionCombination'
 *         quantity:
 *           type: integer
 *           description: 수량
 *         status:
 *           type: integer
 *           description: 상태
 *         createdAt:
 *           type: string
 *           format: Timestamp
 *           description: 생성일
 *       required:
 *         - id
 *         - optionCombination
 *         - quantity
 *         - status
 *         - createdAt
 *     SelectedProductList:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/SelectedProduct'
 */
let SelectedProduct = class SelectedProduct {
    constructor(quantity, status, user, optionCombination) {
        this.quantity = quantity;
        this.status = status;
        this.user = user;
        this.optionCombination = optionCombination;
    }
};
exports.SelectedProduct = SelectedProduct;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], SelectedProduct.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], SelectedProduct.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)('tinyint'),
    __metadata("design:type", Number)
], SelectedProduct.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeorm_1.Timestamp)
], SelectedProduct.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.User, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", entities_1.User)
], SelectedProduct.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.OptionCombination, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", entities_1.OptionCombination)
], SelectedProduct.prototype, "optionCombination", void 0);
exports.SelectedProduct = SelectedProduct = __decorate([
    (0, typeorm_1.Entity)('select_product'),
    __metadata("design:paramtypes", [Number, Number, entities_1.User, entities_1.OptionCombination])
], SelectedProduct);
