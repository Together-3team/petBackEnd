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
exports.Delivery = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
/**
 * @swagger
 * components:
 *   schemas:
 *     Delivery:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 고유 ID
 *         user:
 *           type: User
 *           description: 사용자
 *         name:
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
 *         isDefault:
 *           type: boolean
 *           description: 기본 배송지 여부
 *         createdAt:
 *           type: string
 *           format: Timestamp
 *           description: 생성일
 *       required:
 *         - id
 *         - userId
 *         - name
 *         - recipient
 *         - recipientPhoneNumber
 *         - zipCode
 *         - address
 *         - detailedAddress
 *         - isDefault
 *         - createdAt
 *     DeliveryList:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/Delivery'
 */
let Delivery = class Delivery {
    constructor(name, recipient, recipientPhoneNumber, zipCode, address, detailedAddress, user) {
        this.isDefault = false;
        this.name = name;
        this.recipient = recipient;
        this.recipientPhoneNumber = recipientPhoneNumber;
        this.zipCode = zipCode;
        this.address = address;
        this.detailedAddress = detailedAddress;
        this.user = user;
    }
};
exports.Delivery = Delivery;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Delivery.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 30 }),
    __metadata("design:type", String)
], Delivery.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 30 }),
    __metadata("design:type", String)
], Delivery.prototype, "recipient", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 20 }),
    __metadata("design:type", String)
], Delivery.prototype, "recipientPhoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], Delivery.prototype, "zipCode", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 30 }),
    __metadata("design:type", String)
], Delivery.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 30 }),
    __metadata("design:type", String)
], Delivery.prototype, "detailedAddress", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean'),
    __metadata("design:type", Boolean)
], Delivery.prototype, "isDefault", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeorm_1.Timestamp)
], Delivery.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.User, { eager: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", entities_1.User)
], Delivery.prototype, "user", void 0);
exports.Delivery = Delivery = __decorate([
    (0, typeorm_1.Entity)('delivery'),
    __metadata("design:paramtypes", [String, String, String, Number, String, String, entities_1.User])
], Delivery);
