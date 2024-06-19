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
const AuthRouter = express_1.default.Router();
const authController = new controllers_1.AuthController();
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
 *               oneOf:
 *                 - $ref: '#/components/schemas/AuthRegisteredResponseDto'
 *                 - $ref: '#/components/schemas/AuthNotRegisteredResponseDto'
 *       404:
 *         description: 로그인에 실패했습니다
 */
AuthRouter.get('/google', passport_1.default.authenticate('google', { scope: ['email', 'profile'] }));
AuthRouter.get('/google/callback', authController.authenticateGoogle);
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
 *               oneOf:
 *                 - $ref: '#/components/schemas/AuthRegisteredResponseDto'
 *                 - $ref: '#/components/schemas/AuthNotRegisteredResponseDto'
 *       404:
 *         description: 로그인에 실패했습니다
 */
AuthRouter.get('/kakao', passport_1.default.authenticate('kakao'));
AuthRouter.get('/kakao/callback', authController.authenticateKakao);
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
AuthRouter.post('/register', (0, middleware_1.validateDto)(dtos_1.RegisterRequestDto), authController.register);
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
AuthRouter.post('/refresh', authController.refresh);
exports.default = AuthRouter;
