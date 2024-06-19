"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const passport_1 = __importDefault(require("passport"));
const PaymentRouter = express_1.default.Router();
const paymentController = new controllers_1.PaymentController();
/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: 결제 관련 API
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     PaymentRequestDto:
 *       type: object
 *       properties:
 *         selectedProductIds:
 *           type: string
 *           description: 선택된 제품 ID들
 *         deliveryId:
 *           type: number
 *           description: 배송 ID
 *         groupBuyingId:
 *           type: number
 *           description: 공동구매 ID
 *         amount:
 *           type: number
 *           description: 결제 금액
 *         deliveryMessage:
 *           type: string
 *           description: 주문 상세 요청
 *         orderId:
 *           type: string
 *           description: 주문 ID
 *         paymentKey:
 *           type: string
 *           description: 결제 키
 */
/**
 * @swagger
 * /payments/webhook:
 *   post:
 *     summary: 결제 상태 변경 웹훅
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventType:
 *                 type: string
 *                 description: 이벤트 타입
 *               data:
 *                 type: object
 *                 properties:
 *                   orderId:
 *                     type: string
 *                     description: 주문 ID
 *                   status:
 *                     type: string
 *                     description: 결제 상태
 *                   approvedAt:
 *                     type: string
 *                     description: 승인 시간
 *     responses:
 *       200:
 *         description: 성공
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 오류
 */
PaymentRouter.post('/webhook', paymentController.webHook);
/**
 * @swagger
 * /payments/confirm:
 *   post:
 *     summary: 결제 확인
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentRequestDto'
 *     responses:
 *       200:
 *         description: 결제 확인됨
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 오류
 */
PaymentRouter.post('/confirm', passport_1.default.authenticate('jwt', { session: false }), paymentController.paymentsConfirm);
exports.default = PaymentRouter;
