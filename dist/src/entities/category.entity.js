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
exports.Category = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./product.entity");
/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 고유 ID
 *         name:
 *           type: string
 *           description: 카테고리명
 *         parentId:
 *           type: integer
 *           description: 부모 카테고리 ID
 *         depth:
 *           type: integer
 *           description: 뎁스
 *         categoryStr:
 *           type: string
 *           description: 카테고리문자열
 *         isDeleted:
 *           type: boolean
 *           description: 삭제 여부
 *         createdAt:
 *           type: string
 *           format: timestamp
 *           description: 생성일
 *       required:
 *         - id
 *         - name
 *         - parentId
 *         - depth
 *         - isDeleted
 *         - createdAt
 */
let Category = class Category {
};
exports.Category = Category;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Category.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 20, nullable: false }),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => product_entity_1.Product, product => product.category, { nullable: true }),
    __metadata("design:type", product_entity_1.Product)
], Category.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: false }),
    __metadata("design:type", Number)
], Category.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: false }),
    __metadata("design:type", Number)
], Category.prototype, "depth", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 50, nullable: false }),
    __metadata("design:type", String)
], Category.prototype, "categoryStr", void 0);
__decorate([
    (0, typeorm_1.Column)('tinyint', { nullable: false }),
    __metadata("design:type", Boolean)
], Category.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeorm_1.Timestamp)
], Category.prototype, "createdAt", void 0);
exports.Category = Category = __decorate([
    (0, typeorm_1.Entity)()
], Category);
