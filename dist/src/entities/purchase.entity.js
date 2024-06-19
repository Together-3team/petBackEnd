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
exports.Purchase = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
const purchase_product_entity_1 = require("./purchase.product.entity");
/**
 * @swagger
 * components:
 *   schemas:
 *     Purchase:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 고유 ID
 *         user:
 *           $ref: '#/components/schemas/User'
 *         deliveryName:
 *           type: string
 *           description: 배송지명
 *         recipient:
 *           type: string
 *           description: 수령인
 *         recipientPhoneNumber:
 *           type: string
 *           description: 수령인 연락처
 *         zipCode:
 *           type: integer
 *           description: 우편번호
 *         address:
 *           type: string
 *           description: 주소지
 *         detailedAddress:
 *           type: string
 *           description: 상세 주소
 *         deliveryMessage:
 *           type: string
 *           description: 배송 메시지
 *         purchaseProducts:
 *           $ref: '#/components/schemas/PurchaseProductList'
 *         orderId:
 *           type: string
 *           description: 결제 ID
 *         paymentKey:
 *           type: string
 *           description: 결제 키
 *         paymentStatus:
 *           type: integer
 *           description: 결제 상태
 *         createdAt:
 *           type: string
 *           format: Timestamp
 *           description: 생성일
 *       required:
 *         - id
 *         - user
 *         - delivery
 *         - purchaseProducts
 *         - orderId
 *         - paymentKey
 *         - paymentStatus
 *         - createdAt
 */
let Purchase = class Purchase {
    constructor() {
        this.paymentStatus = 0;
    }
};
exports.Purchase = Purchase;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Purchase.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Object)
], Purchase.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.User, { eager: true }),
    __metadata("design:type", entities_1.User)
], Purchase.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 30 }),
    __metadata("design:type", String)
], Purchase.prototype, "deliveryName", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 30 }),
    __metadata("design:type", String)
], Purchase.prototype, "recipient", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 20 }),
    __metadata("design:type", String)
], Purchase.prototype, "recipientPhoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], Purchase.prototype, "zipCode", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 30 }),
    __metadata("design:type", String)
], Purchase.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 30 }),
    __metadata("design:type", String)
], Purchase.prototype, "detailedAddress", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 30 }),
    __metadata("design:type", String)
], Purchase.prototype, "deliveryMessage", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => purchase_product_entity_1.PurchaseProduct, (purchaseProduct) => purchaseProduct.purchase, { eager: true, cascade: true }),
    __metadata("design:type", Array)
], Purchase.prototype, "purchaseProducts", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 30, unique: true }),
    __metadata("design:type", String)
], Purchase.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 30, unique: true }),
    __metadata("design:type", String)
], Purchase.prototype, "paymentKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint' }),
    __metadata("design:type", Number)
], Purchase.prototype, "paymentStatus", void 0);
exports.Purchase = Purchase = __decorate([
    (0, typeorm_1.Entity)('purchase')
], Purchase);
