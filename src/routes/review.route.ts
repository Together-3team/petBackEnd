import express, { Router } from 'express'
import { ReviewController } from '../controllers'

const ReviewRouter: Router = express.Router()
const reviewController = new ReviewController();

/**
 * @swagger
 * tags:
 *   name: Review
 *   description: 리뷰 관련 API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ReviewCreateRequestDto:
 *       type: object
 *       properties:
 *         productId:
 *           type: integer
 *           description: 상품 ID
 *         userId:
 *           type: integer
 *           description: 사용자 ID
 *         rating:
 *           type: integer
 *           description: 별점
 *         reviewImages:
 *           type: string
 *           description: 리뷰 이미지 URL
 *         description:
 *           type: string
 *           description: 리뷰 내용
 *       required:
 *         - productId
 *         - userId
 *         - rating
 *         - description
 *     Review:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 리뷰 고유 ID
 *         productId:
 *           type: integer
 *           description: 상품 ID
 *         userId:
 *           type: integer
 *           description: 사용자 ID
 *         rating:
 *           type: integer
 *           description: 별점
 *         reviewImages:
 *           type: string
 *           description: 리뷰 이미지 URL
 *         description:
 *           type: string
 *           description: 리뷰 내용
 *         isDeleted:
 *           type: boolean
 *           description: 삭제 여부
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: 생성일
 *       required:
 *         - id
 *         - productId
 *         - userId
 *         - rating
 *         - description
 *         - isDeleted
 *         - createdAt
 */



/**
 * @swagger
 * /review/new:
 *   post:
 *     summary: 리뷰 생성
 *     tags: [Review]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewCreateRequestDto'
 *     responses:
 *       200:
 *         description: 리뷰 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: Success
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
ReviewRouter.post('/new', reviewController.createReview);

export default ReviewRouter