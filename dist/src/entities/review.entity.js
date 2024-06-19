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
exports.Review = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./product.entity");
const user_entity_1 = require("./user.entity");
const purchase_product_entity_1 = require("./purchase.product.entity");
/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 고유 ID
 *         productId:
 *           type: integer
 *           description: 상품 ID
 *         userId:
 *           type: integer
 *           description: 사용자 ID
 *         rating:
 *           type: integer
 *           description: 별점
 *         reviewImages:
 *           type: string
 *           description: 리뷰 이미지
 *         description:
 *           type: string
 *           description: 리뷰 내용
 *         isDeleted:
 *           type: boolean
 *           description: 삭제 여부
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: 생성일
 *       required:
 *         - id
 *         - productId
 *         - userId
 *         - rating
 *         - isDeleted
 *         - createdAt
 */
let Review = class Review {
};
exports.Review = Review;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Review.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, product => product.id, { nullable: true }),
    __metadata("design:type", product_entity_1.Product)
], Review.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.id, { nullable: true }),
    __metadata("design:type", user_entity_1.User)
], Review.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => purchase_product_entity_1.PurchaseProduct, (purchaseProduct) => purchaseProduct.review),
    __metadata("design:type", purchase_product_entity_1.PurchaseProduct)
], Review.prototype, "purchaseProduct", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Review.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Review.prototype, "reviewImages", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Review.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0, nullable: true }),
    __metadata("design:type", Number)
], Review.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeorm_1.Timestamp)
], Review.prototype, "createdAt", void 0);
exports.Review = Review = __decorate([
    (0, typeorm_1.Entity)()
], Review);
