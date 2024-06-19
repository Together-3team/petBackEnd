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
exports.Option = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
/**
 * @swagger
 * components:
 *   schemas:
 *     Option:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 고유 ID
 *         optionKey:
 *           type: string
 *           maxLength: 15
 *           description: 옵션 타입
 *         optionValue:
 *           type: string
 *           maxLength: 50
 *           description: 옵션 명
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: 생성일
 *         productDetailId:
 *           type: integer
 *           nullable: false
 *           description: 상품 디테일 ID
 */
let Option = class Option {
};
exports.Option = Option;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Option.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 15 }),
    __metadata("design:type", String)
], Option.prototype, "optionKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Option.prototype, "optionValue", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeorm_1.Timestamp)
], Option.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.Product, product => product.options, { nullable: true }),
    __metadata("design:type", Number)
], Option.prototype, "product", void 0);
exports.Option = Option = __decorate([
    (0, typeorm_1.Entity)()
], Option);
