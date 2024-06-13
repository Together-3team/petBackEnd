import express, { Router } from 'express'
import { UserController } from '../controllers'
import passport from 'passport'

const UserRouter: Router = express.Router()
const userController = new UserController()

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 사용자
 */

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: 내 정보
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 사용자 상세 정보
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponseDto'
 *       404:
 *         description: 존재하지 않는 사용자입니다
 */
UserRouter.get('/me', passport.authenticate('jwt', { session: false }), userController.getMe)

/**
 * @swagger
 * /users/verify-nickname:
 *   post:
 *     summary: 닉네임 중복 검사
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 description: 닉네임
 *     responses:
 *       200:
 *         description: 닉네임 중복 여부
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 duplicated:
 *                   type: boolean
 *                   description: 닉네임 중복 여부
 *       500:
 *         description: 잘못된 입력입니다
 */
UserRouter.post('/verify-nickname', userController.verifyNickname)

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: 사용자 상세 정보
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: 사용자 ID
 *     responses:
 *       200:
 *         description: 사용자 상세 정보
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponseDto'
 *       404:
 *         description: 존재하지 않는 사용자입니다
 */
UserRouter.get('/:id', userController.getUser)

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: 사용자 수정
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: 사용자 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdateRequestDto'
 *     responses:
 *       200:
 *         description: 사용자 수정
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponseDto'
 *       500:
 *         description: Internal server error
 */
UserRouter.put('/:id', userController.updateUser)

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: 사용자 삭제
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: 사용자 ID
 *     responses:
 *       200:
 *         description: 삭제된 사용자
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteResultDto'
 *       500:
 *         description: Internal server error
 * 
 * components:
 *   schemas:
 *     DeleteResultDto:
 *       type: object
 *       properties:
 *         raw:
 *           type: array
 *           items:
 *             type: object
 *           description: Raw database response
 *         affected:
 *           type: integer
 *           description: Number of rows affected
 */
UserRouter.delete('/:id', userController.deleteUser)

export default UserRouter