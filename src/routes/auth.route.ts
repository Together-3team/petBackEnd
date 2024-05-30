import express, { Router } from 'express'
import { AuthController } from '../controllers'
import passport from 'passport'
import cors from 'cors'

const AuthRouter: Router = express.Router()
const authController = new AuthController()

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: 구글 인증
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: 사용자 상세 정보
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: 로그인에 실패했습니다
 */
AuthRouter.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }))
AuthRouter.get('/google/callback', authController.authenticateGoogle)

/**
 * @swagger
 * /auth/kakao:
 *   get:
 *     summary: 카카오 인증
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: 사용자 상세 정보
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: 로그인에 실패했습니다
 */
AuthRouter.get('/kakao', passport.authenticate('kakao'))
AuthRouter.get('/kakao/callback', authController.authenticateKakao)

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: 회원 가입
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *               profileToken:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *             required:
 *               - nickname
 *               - profileToken
 *               - phoneNumber
 *     responses:
 *       200:
 *         description: 사용자 상세 정보
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: 로그인에 실패했습니다
 */
AuthRouter.post('/register', authController.register)

export default AuthRouter