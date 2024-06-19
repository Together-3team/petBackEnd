"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const passport_1 = __importDefault(require("passport"));
const middleware_1 = require("../middleware");
const dtos_1 = require("../dtos");
const ZzimRouter = express_1.default.Router();
const zzimController = new controllers_1.ZzimController();
/**
 * @swagger
 * tags:
 *   name: Zzims
 *   description: 찜
 */
/**
 * @swagger
 * /zzims:
 *   get:
 *     summary: 찜 조회
 *     tags: [Zzims]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 찜 리스트
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ZzimListResponseDto'
 *       404:
 *         description: 존재하지 않는 사용자입니다
 */
ZzimRouter.get('/', passport_1.default.authenticate('jwt', { session: false }), zzimController.getZzimsByUser);
/**
 * @swagger
 * /zzims:
 *   post:
 *     summary: 찜 등록
 *     tags: [Zzims]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ZzimCreateRequestDto'
 *     responses:
 *       200:
 *         description: 찜 상세 정보
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ZzimResponseDto'
 *       500:
 *         description: Internal server error
 */
ZzimRouter.post('/', passport_1.default.authenticate('jwt', { session: false }), (0, middleware_1.validateDto)(dtos_1.ZzimCreateRequestDto), zzimController.createZzim);
/**
 * @swagger
 * /zzims/{id}:
 *   delete:
 *     summary: 찜 삭제
 *     tags: [Zzims]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: 찜 ID
 *     responses:
 *       200:
 *         description: 삭제된 찜
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteResultDto'
 *       500:
 *         description: Internal server error
 */
ZzimRouter.delete('/:id', passport_1.default.authenticate('jwt', { session: false }), zzimController.deleteZzim);
exports.default = ZzimRouter;
