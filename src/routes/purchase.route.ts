import express, { Router } from 'express'
import { PurchaseController } from '../controllers'
import passport from 'passport'
import { validateDto } from '../middleware'
import { PurchaseCreateRequestDto } from '../dtos'

const PurchaseRouter: Router = express.Router()
const purchaseController = new PurchaseController()

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
PurchaseRouter.get('/',
    passport.authenticate('jwt', { session: false }),
    purchaseController.getPurchasesByUser)

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
PurchaseRouter.get('/:id',
    passport.authenticate('jwt', { session: false }),
    purchaseController.getPurchaseById)
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
PurchaseRouter.get('/',
    passport.authenticate('jwt', { session: false }),
    purchaseController.getPurchasesByUser)

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
PurchaseRouter.post('/',
    passport.authenticate('jwt', { session: false }),
    validateDto(PurchaseCreateRequestDto),
    purchaseController.createPurchase)

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
PurchaseRouter.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    purchaseController.deletePurchase)

export default PurchaseRouter