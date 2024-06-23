import express, { Router } from 'express'
import { AuthController } from '../controllers'
import passport from 'passport'
import { validateDto } from '../middleware'
import { RegisterRequestDto } from '../dtos'

const AuthRouter: Router = express.Router()
const authController = new AuthController()

/**
 * @swagger
 * /auth/google/local:
 *   get:
 *     summary: 구글 localhost 인증
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: 사용자 상세 정보
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/AuthRegisteredResponseDto'
 *                 - $ref: '#/components/schemas/AuthNotRegisteredResponseDto'
 *       404:
 *         description: 로그인에 실패했습니다
 */
AuthRouter.get('/google/local', authController.authenticate('google', true))
/**
 * @swagger
 * /auth/google/server:
 *   get:
 *     summary: 구글 vercel 인증
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: 사용자 상세 정보
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/AuthRegisteredResponseDto'
 *                 - $ref: '#/components/schemas/AuthNotRegisteredResponseDto'
 *       404:
 *         description: 로그인에 실패했습니다
 */
AuthRouter.get('/google/server', authController.authenticate('google', false))
AuthRouter.get('/google/callback', authController.authenticateGoogle)

/**
 * @swagger
 * /auth/kakao/local:
 *   get:
 *     summary: 카카오 localhost 인증
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: 사용자 상세 정보
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/AuthRegisteredResponseDto'
 *                 - $ref: '#/components/schemas/AuthNotRegisteredResponseDto'
 *       404:
 *         description: 로그인에 실패했습니다
 */
AuthRouter.get('/kakao/local', authController.authenticate('kakao', true))
/**
 * @swagger
 * /auth/kakao/server:
 *   get:
 *     summary: 카카오 vercel 인증
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: 사용자 상세 정보
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/AuthRegisteredResponseDto'
 *                 - $ref: '#/components/schemas/AuthNotRegisteredResponseDto'
 *       404:
 *         description: 로그인에 실패했습니다
 */
AuthRouter.get('/kakao/server', authController.authenticate('kakao', false))
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
 *             $ref: '#/components/schemas/RegisterRequestDto'
 *     responses:
 *       200:
 *         description: 사용자 상세 정보
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenResponseDto'
 *       404:
 *         description: 로그인에 실패했습니다
 */
AuthRouter.post('/register',
    validateDto(RegisterRequestDto),
    authController.register)

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: 토큰 갱신
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *             required:
 *               - refreshToken
 *     responses:
 *       200:
 *         description: 갱신된 토큰
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenResponseDto'
 *       500:
 *         description: refreshToken이 필요합니다
 */
AuthRouter.post('/refresh', authController.refresh)

export default AuthRouter