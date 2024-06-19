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
exports.User = void 0;
const typeorm_1 = require("typeorm");
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 고유 ID
 *         email:
 *           type: string
 *           description: 이메일
 *         nickname:
 *           type: string
 *           description: 닉네임
 *         phoneNumber:
 *           type: string
 *           description: 연락처
 *         profileImage:
 *           type: string
 *           format: uri
 *           description: 프로필 이미지
 *         snsId:
 *           type: string
 *           description: 소셜 ID
 *         provider:
 *           type: string
 *           description: 플랫폼
 *         createdAt:
 *           type: string
 *           format: Timestamp
 *           description: 생성일
 *         deletedAt:
 *           type: string
 *           format: Timestamp
 *       required:
 *         - id
 *         - email
 *         - nickname
 *         - phoneNumber
 *         - snsId
 *         - provider
 *         - createdAt
 */
let User = class User {
    constructor(email, nickname, phoneNumber, profileImage) {
        this.snsId = 'local';
        this.provider = 'local';
        this.isSubscribedToPromotions = false;
        this.preferredPet = 0;
        this.email = email;
        this.nickname = nickname;
        this.phoneNumber = phoneNumber;
        this.profileImage = profileImage;
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 30 }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 30 }),
    __metadata("design:type", String)
], User.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 20 }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], User.prototype, "profileImage", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 30 }),
    __metadata("design:type", String)
], User.prototype, "snsId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 10 }),
    __metadata("design:type", String)
], User.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean'),
    __metadata("design:type", Boolean)
], User.prototype, "isSubscribedToPromotions", void 0);
__decorate([
    (0, typeorm_1.Column)('tinyint'),
    __metadata("design:type", Number)
], User.prototype, "preferredPet", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeorm_1.Timestamp)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", typeorm_1.Timestamp)
], User.prototype, "deletedAt", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('user'),
    __metadata("design:paramtypes", [String, String, String, String])
], User);
