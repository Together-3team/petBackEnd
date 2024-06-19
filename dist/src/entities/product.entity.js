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
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const option_entity_1 = require("./option.entity");
const option_combination_entity_1 = require("./option.combination.entity");
const category_entity_1 = require("./category.entity");
const group_buying_entity_1 = require("./group.buying.entity");
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 고유 ID
 *         title:
 *           type: string
 *           description: 상품명
 *         originalPrice:
 *           type: integer
 *           description: 원가
 *         price:
 *           type: integer
 *           description: 판매가
 *         thumbNailImage:
 *           type: string
 *           nullable: true
 *           description: 썸네일 이미지
 *         isDeleted:
 *           type: integer
 *           description: 삭제 여부
 *         petType:
 *           type: integer
 *           description: 대상 반려동물 종류
 *         createdAt:
 *           type: string
 *           format: Timestamp
 *           description: 생성일
 *         updatedAt:
 *           type: string
 *           format: Timestamp
 *           description: 수정일
 *       required:
 *         - id
 *         - title
 *         - originalPrice
 *         - price
 *         - discountRate
 *         - isDeleted
 *         - petType
 *         - createdAt
 *         - updatedAt
 */
let Product = class Product {
    constructor() {
        /**
         * 썸네일이미지
         */
        this.thumbNailImage = '';
        /**
         * 삭제여부
         */
        this.isDeleted = 0;
        this.petType = 0;
    }
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 60 }),
    __metadata("design:type", String)
], Product.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Product.prototype, "originalPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "thumbNailImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "petType", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => group_buying_entity_1.GroupBuying, (groupBuying) => groupBuying.product),
    __metadata("design:type", Array)
], Product.prototype, "groupBuying", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => option_entity_1.Option, option => option.product, { nullable: true }),
    __metadata("design:type", Array)
], Product.prototype, "options", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => option_combination_entity_1.OptionCombination, optionCombination => optionCombination.product, { nullable: true }),
    __metadata("design:type", Array)
], Product.prototype, "optionCombinations", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => category_entity_1.Category, (category) => category.product, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", category_entity_1.Category)
], Product.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeorm_1.Timestamp)
], Product.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeorm_1.Timestamp)
], Product.prototype, "updatedAt", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)('product')
], Product);
