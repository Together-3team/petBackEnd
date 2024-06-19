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
exports.ProductDetail = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
/**
 * @swagger
 * components:
 *   schemas:
 *     ProductDetail:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 고유 ID
 *         productId:
 *           type: integer
 *           description: 상품 참조 키
 *         categoryId:
 *           type: integer
 *           description: 카테고리 참조 키
 *         productImages:
 *           type: string
 *           description: 상품 이미지
 *         descriptionImages:
 *           type: string
 *           description: 설명 이미지
 *         inventory:
 *           type: integer
 *           description: 재고
 *         description:
 *           type: string
 *           description: 설명
 *         createdAt:
 *           type: string
 *           format: timestamp
 *           description: 생성일
 *       required:
 *         - id
 *         - productId
 *         - categoryId
 *         - inventory
 *         - createdAt
 */
let ProductDetail = class ProductDetail {
    constructor() {
        /**
         * 설명
         */
        this.description = '';
    }
};
exports.ProductDetail = ProductDetail;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProductDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.Product, product => product.id, { nullable: true }),
    __metadata("design:type", entities_1.Product)
], ProductDetail.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entities_1.Review, review => review.id, { nullable: true }),
    __metadata("design:type", Array)
], ProductDetail.prototype, "reviews", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], ProductDetail.prototype, "productImages", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], ProductDetail.prototype, "descriptionImages", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: false }),
    __metadata("design:type", Number)
], ProductDetail.prototype, "inventory", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], ProductDetail.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeorm_1.Timestamp)
], ProductDetail.prototype, "createdAt", void 0);
exports.ProductDetail = ProductDetail = __decorate([
    (0, typeorm_1.Entity)()
], ProductDetail);
