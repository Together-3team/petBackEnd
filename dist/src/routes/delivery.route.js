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
const deliveryRouter = express_1.default.Router();
const deliveryController = new controllers_1.DeliveryController();
/**
 * @swagger
 * tags:
 *   name: Deliveries
 *   description: 배송지
 */
/**
 * @swagger
 * /deliveries/default:
 *   get:
 *     summary: 기본 배송지 조회
 *     tags: [Deliveries]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 배송지
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeliveryResponseDto'
 *       404:
 *         description: 존재하지 않는 사용자입니다
 */
deliveryRouter.get('/default', passport_1.default.authenticate('jwt', { session: false }), deliveryController.getDefaultDelivery);
/**
 * @swagger
 * /deliveries/{id}:
 *   get:
 *     summary: 배송지 상세 정보
 *     tags: [Deliveries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: 배송지 ID
 *     responses:
 *       200:
 *         description: 배송지 상세 정보
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeliveryResponseDto'
 *       404:
 *         description: 존재하지 않는 사용자입니다
 */
deliveryRouter.get('/:id', passport_1.default.authenticate('jwt', { session: false }), deliveryController.getDeliveryById);
/**
 * @swagger
 * /deliveries:
 *   get:
 *     summary: 배송지 조회
 *     tags: [Deliveries]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 배송지 리스트
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeliveryListResponseDto'
 *       404:
 *         description: 존재하지 않는 사용자입니다
 */
deliveryRouter.get('/', passport_1.default.authenticate('jwt', { session: false }), deliveryController.getDeliveriesByUser);
/**
 * @swagger
 * /deliveries:
 *   post:
 *     summary: 배송지 등록
 *     tags: [Deliveries]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeliveryCreateRequestDto'
 *     responses:
 *       200:
 *         description: 사용자 등록
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeliveryResponseDto'
 *       500:
 *         description: Internal server error
 */
deliveryRouter.post('/', passport_1.default.authenticate('jwt', { session: false }), (0, middleware_1.validateDto)(dtos_1.DeliveryCreateRequestDto), deliveryController.createDelivery);
/**
 * @swagger
 * /deliveries/{id}:
 *   put:
 *     summary: 배송지 수정
 *     tags: [Deliveries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: 배송지 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeliveryUpdateRequestDto'
 *     responses:
 *       200:
 *         description: 사용자 수정
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeliveryResponseDto'
 *       500:
 *         description: Internal server error
 */
deliveryRouter.put('/:id', passport_1.default.authenticate('jwt', { session: false }), (0, middleware_1.validateDto)(dtos_1.DeliveryUpdateRequestDto), deliveryController.updateDelivery);
/**
 * @swagger
 * /deliveries/{id}:
 *   delete:
 *     summary: 배송지 삭제
 *     tags: [Deliveries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: 배송지 ID
 *     responses:
 *       200:
 *         description: 삭제된 배송지
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteResultDto'
 *       500:
 *         description: Internal server error
 */
deliveryRouter.delete('/:id', passport_1.default.authenticate('jwt', { session: false }), deliveryController.deleteDelivery);
exports.default = deliveryRouter;
