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
const PurchaseRouter = express_1.default.Router();
const purchaseController = new controllers_1.PurchaseController();
/**
 * @swagger
 * tags:
 *   name: Purchases
 *   description: 구매 내역
 */
/**
 * @swagger
 * /purchases:
 *   get:
 *     summary: 구매 내역 조회
 *     tags: [Purchases]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 구매 내역 리스트
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PurchaseListResponseDto'
 *       404:
 *         description: 존재하지 않는 사용자입니다
 */
PurchaseRouter.get('/', passport_1.default.authenticate('jwt', { session: false }), purchaseController.getPurchasesByUser);
/**
 * @swagger
 * /purchases/{id}:
 *   get:
 *     summary: 상세 구매 내역 조회
 *     tags: [Purchases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: 구매 내역 ID
 *     responses:
 *       200:
 *         description: 상세 구매 내역
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PurchaseResponseDto'
 *       404:
 *         description: 존재하지 않는 사용자입니다
 */
PurchaseRouter.get('/:id', passport_1.default.authenticate('jwt', { session: false }), purchaseController.getPurchaseById);
/**
 * @swagger
 * /purchases:
 *   get:
 *     summary: 구매 내역 조회
 *     tags: [Purchases]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 구매 내역 리스트
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PurchaseListResponseDto'
 *       404:
 *         description: 존재하지 않는 사용자입니다
 */
PurchaseRouter.get('/', passport_1.default.authenticate('jwt', { session: false }), purchaseController.getPurchasesByUser);
/**
 * @swagger
 * /purchases:
 *   post:
 *     summary: 구매 내역 등록
 *     tags: [Purchases]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PurchaseCreateRequestDto'
 *     responses:
 *       200:
 *         description: 구매 내역 상세 정보
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PurchaseResponseDto'
 *       500:
 *         description: Internal server error
 */
PurchaseRouter.post('/', passport_1.default.authenticate('jwt', { session: false }), (0, middleware_1.validateDto)(dtos_1.PurchaseCreateRequestDto), purchaseController.createPurchase);
/**
 * @swagger
 * /purchases/products/{id}:
 *   put:
 *     summary: 구매 상품 수정
 *     description: 2 - 주문 완료, 3 - 배송 준비, 4 - 배송 중, 5 - 배송 완료, 6 - 상품 취소
 *     tags: [Purchases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: 구매 상품 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PurchaseProductUpdateRequestDto'
 *     responses:
 *       200:
 *         description: 수정된 구매 상품
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PurchaseProductResponseDto'
 *       500:
 *         description: Internal server error
 */
PurchaseRouter.put('/products/:id', passport_1.default.authenticate('jwt', { session: false }), (0, middleware_1.validateDto)(dtos_1.PurchaseProductUpdateRequestDto), purchaseController.updatePurchaseProduct);
/**
 * @swagger
 * /purchases/{id}:
 *   put:
 *     summary: 구매 내역 수정
 *     tags: [Purchases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: 구매 내역 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PurchaseUpdateRequestDto'
 *     responses:
 *       200:
 *         description: 수정된 구매 내역
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PurchaseResponseDto'
 *       500:
 *         description: Internal server error
 */
PurchaseRouter.put('/:id', passport_1.default.authenticate('jwt', { session: false }), (0, middleware_1.validateDto)(dtos_1.PurchaseUpdateRequestDto), purchaseController.updatePurchase);
/**
 * @swagger
 * /purchases/{id}:
 *   delete:
 *     summary: 구매 내역 삭제
 *     tags: [Purchases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: 구매 내역 ID
 *     responses:
 *       200:
 *         description: 삭제된 구매 내역
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteResultDto'
 *       500:
 *         description: Internal server error
 */
PurchaseRouter.delete('/:id', passport_1.default.authenticate('jwt', { session: false }), purchaseController.deletePurchase);
exports.default = PurchaseRouter;
