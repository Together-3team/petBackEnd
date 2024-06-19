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
const SelectedProductRouter = express_1.default.Router();
const selectedProductController = new controllers_1.SelectedProductController();
/**
 * @swagger
 * tags:
 *   name: SelectedProducts
 *   description: 선택된 상품
 */
/**
 * @swagger
 * /selected-products:
 *   get:
 *     summary: 모든 선택된 상품 조회
 *     tags: [SelectedProducts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 선택된 상품 목록
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SelectedProductList'
 *       404:
 *         description: 존재하지 않는 사용자입니다
 */
SelectedProductRouter.get('/', passport_1.default.authenticate('jwt', { session: false }), selectedProductController.getSelectedProducts);
/**
 * @swagger
 * /selected-products/carts:
 *   get:
 *     summary: 장바구니 목록 조회
 *     tags: [SelectedProducts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 장바구니 목록
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SelectedProductListResponseDto'
 *       404:
 *         description: 존재하지 않는 사용자입니다
 */
SelectedProductRouter.get('/carts', passport_1.default.authenticate('jwt', { session: false }), selectedProductController.getCarts);
/**
 * @swagger
 * /selected-products/orders:
 *   get:
 *     summary: 주문 목록 조회
 *     tags: [SelectedProducts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 주문 목록
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SelectedProductListResponseDto'
 *       404:
 *         description: 존재하지 않는 사용자입니다
 */
SelectedProductRouter.get('/orders', passport_1.default.authenticate('jwt', { session: false }), selectedProductController.getOrders);
/**
 * @swagger
 * /selected-products/orders-to-carts:
 *   put:
 *     summary: 장바구니 목록 추가
 *     tags: [SelectedProducts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 추가된 장바구니 목록 정보
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SelectedProductListResponseDto'
 *       500:
 *         description: Internal server error
 */
SelectedProductRouter.put('/orders-to-carts', passport_1.default.authenticate('jwt', { session: false }), selectedProductController.orderToCart);
/**
 * @swagger
 * /selected-products/orders:
 *   post:
 *     summary: 주문 목록 추가
 *     tags: [SelectedProducts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SelectedProductCreateRequestDto'
 *     responses:
 *       200:
 *         description: 선택된 상품 정보
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SelectedProductResponseDto'
 *       500:
 *         description: Internal server error
 */
SelectedProductRouter.post('/orders', passport_1.default.authenticate('jwt', { session: false }), (0, middleware_1.validateDto)(dtos_1.SelectedProductCreateRequestDto), selectedProductController.addToOrder);
/**
 * @swagger
 * /selected-products/{id}:
 *   put:
 *     summary: 선택된 상품 수정
 *     tags: [SelectedProducts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: 선택된 상품 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SelectedProductUpdateRequestDto'
 *     responses:
 *       200:
 *         description: 선택된 상품
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SelectedProductResponseDto'
 *       500:
 *         description: Internal server error
 */
SelectedProductRouter.put('/:id', passport_1.default.authenticate('jwt', { session: false }), (0, middleware_1.validateDto)(dtos_1.SelectedProductUpdateRequestDto), selectedProductController.updateSelectedProduct);
/**
 * @swagger
 * /selected-products/carts:
 *   delete:
 *     summary: 장바구니 전체 삭제
 *     tags: [SelectedProducts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 삭제된 상품
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteResultDto'
 *       500:
 *         description: Internal server error
 */
SelectedProductRouter.delete('/carts', passport_1.default.authenticate('jwt', { session: false }), selectedProductController.deleteCarts);
/**
 * @swagger
 * /selected-products/orders:
 *   delete:
 *     summary: 주문 목록 전체 삭제
 *     tags: [SelectedProducts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 삭제된 상품
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteResultDto'
 *       500:
 *         description: Internal server error
 */
SelectedProductRouter.delete('/orders', passport_1.default.authenticate('jwt', { session: false }), selectedProductController.deleteOrders);
/**
 * @swagger
 * /selected-products/{id}:
 *   delete:
 *     summary: 선택된 상품 삭제
 *     tags: [SelectedProducts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: 선택된 상품 ID
 *     responses:
 *       200:
 *         description: 삭제된 상품
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteResultDto'
 *       500:
 *         description: Internal server error
 */
SelectedProductRouter.delete('/:id', passport_1.default.authenticate('jwt', { session: false }), selectedProductController.deleteSelectedProduct);
exports.default = SelectedProductRouter;
