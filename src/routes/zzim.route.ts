import express, { Router } from 'express'
import { ZzimController } from '../controllers'
import passport from 'passport'
import { validateDto } from '../middleware'
import { ZzimCreateRequestDto } from '../dtos'

const ZzimRouter: Router = express.Router()
const zzimController = new ZzimController()

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
ZzimRouter.get('/',
    passport.authenticate('jwt', { session: false }),
    zzimController.getZzimsByUser)

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
ZzimRouter.post('/',
    passport.authenticate('jwt', { session: false }),
    validateDto(ZzimCreateRequestDto),
    zzimController.createZzim)

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
ZzimRouter.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    zzimController.deleteZzim)

export default ZzimRouter