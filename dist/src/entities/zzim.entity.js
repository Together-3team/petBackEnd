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
exports.Zzim = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
/**
 * @swagger
 * components:
 *   schemas:
 *     Zzim:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 고유 ID
 *         user:
 *           $ref: '#/components/schemas/User'
 *         product:
 *           $ref: '#/components/schemas/Product'
 *         createdAt:
 *           type: string
 *           format: Timestamp
 *           description: 생성일
 *       required:
 *         - id
 *         - user
 *         - product
 *         - createdAt
 *     ZzimList:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/Zzim'
 */
let Zzim = class Zzim {
    constructor(user, product) {
        this.user = user;
        this.product = product;
    }
};
exports.Zzim = Zzim;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Zzim.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeorm_1.Timestamp)
], Zzim.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.User, { eager: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", entities_1.User)
], Zzim.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.Product, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", entities_1.Product)
], Zzim.prototype, "product", void 0);
exports.Zzim = Zzim = __decorate([
    (0, typeorm_1.Entity)('zzim'),
    __metadata("design:paramtypes", [entities_1.User, entities_1.Product])
], Zzim);
