import express, { Router } from 'express'
import { AuthController } from '../controllers'
import passport from 'passport'
import cors from 'cors'

const AuthRouter: Router = express.Router()
const authController = new AuthController()

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: 인증
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Local 로그인
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDto'
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
AuthRouter.post('/login', authController.authenticateLocal)

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

export default AuthRouter