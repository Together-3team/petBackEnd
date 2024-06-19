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
exports.PurchaseProduct = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
/**
 * @swagger
 * components:
 *   schemas:
 *     PurchaseProduct:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 고유 ID
 *         user:
 *           $ref: '#/components/schemas/User'
 *         groupBuying:
 *           $ref: '#/components/schemas/GroupBuying'
 *         purchase:
 *           $ref: '#/components/schemas/Purchase'
 *         title:
 *           type: string
 *           description: 상품 이름
 *         status:
 *           type: integer
 *           description: 배송 상태
 *         combinationName:
 *           type: string
 *           description: 옵션 조합명
 *         quantity:
 *           type: integer
 *           description: 수량
 *         originalPrice:
 *           type: integer
 *           description: 원가
 *         price:
 *           type: integer
 *           description: 할인가
 *         combinationPrice:
 *           type: integer
 *           description: 조합가격
 *         thumbNailImage:
 *           type: string
 *           description: 썸네일 이미지
 *         deliveryCompany:
 *           type: string
 *           description: 배송 회사
 *         trackingNumber:
 *           type: string
 *           description: 송장 번호
 *         productId:
 *           type: integer
 *           description: 물품 ID
 *         createdAt:
 *           type: string
 *           format: Timestamp
 *           description: 생성일
 *       required:
 *         - id
 *         - user
 *         - groupBuying
 *         - purchase
 *         - title
 *         - status
 *         - combinationName
 *         - quantity
 *         - originalPrice
 *         - price
 *         - combinationPrice
 *         - thumbNailImage
 *         - deliveryCompany
 *         - trackingNumber
 *         - createdAt
 *     PurchaseProductList:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/PurchaseProduct'
 */
let PurchaseProduct = class PurchaseProduct {
    constructor() {
        this.status = 2;
    }
};
exports.PurchaseProduct = PurchaseProduct;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], PurchaseProduct.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Object)
], PurchaseProduct.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.User, { eager: true }),
    __metadata("design:type", entities_1.User)
], PurchaseProduct.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.GroupBuying, groupBuying => groupBuying.purchaseProducts, { eager: true }),
    __metadata("design:type", entities_1.GroupBuying)
], PurchaseProduct.prototype, "groupBuying", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.Purchase, purchase => purchase.purchaseProducts),
    __metadata("design:type", entities_1.Purchase)
], PurchaseProduct.prototype, "purchase", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 30 }),
    __metadata("design:type", String)
], PurchaseProduct.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', nullable: false, default: 0 }),
    __metadata("design:type", Number)
], PurchaseProduct.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], PurchaseProduct.prototype, "combinationName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], PurchaseProduct.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], PurchaseProduct.prototype, "originalPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], PurchaseProduct.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], PurchaseProduct.prototype, "combinationPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], PurchaseProduct.prototype, "thumbNailImage", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => entities_1.Review, (review) => review.purchaseProduct),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", entities_1.Review)
], PurchaseProduct.prototype, "review", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], PurchaseProduct.prototype, "deliveryCompany", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], PurchaseProduct.prototype, "trackingNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint' }),
    __metadata("design:type", Number)
], PurchaseProduct.prototype, "productId", void 0);
exports.PurchaseProduct = PurchaseProduct = __decorate([
    (0, typeorm_1.Entity)()
], PurchaseProduct);
