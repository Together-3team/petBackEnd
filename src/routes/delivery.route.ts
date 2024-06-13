import express, { Router } from 'express'
import { DeliveryController } from '../controllers'
import passport from 'passport'
import { validateDto } from '../middleware'
import { DeliveryCreateRequestDto, DeliveryUpdateRequestDto } from '../dtos'

const deliveryRouter: Router = express.Router()
const deliveryController = new DeliveryController()

/**
 * @swagger
 * tags:
 *   name: Deliveries
 *   description: 배송지
 */

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
deliveryRouter.get('/:id',
    passport.authenticate('jwt', { session: false }),
    deliveryController.getDeliveryById)

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
deliveryRouter.get('/',
    passport.authenticate('jwt', { session: false }),
    deliveryController.getDeliveriesByUser)

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
deliveryRouter.post('/',
    passport.authenticate('jwt', { session: false }),
    validateDto(DeliveryCreateRequestDto),
    deliveryController.createDelivery)

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
deliveryRouter.put('/:id',
    passport.authenticate('jwt', { session: false }),
    validateDto(DeliveryUpdateRequestDto),
    deliveryController.updateDelivery)

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
deliveryRouter.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    deliveryController.deleteDelivery)

export default deliveryRouter