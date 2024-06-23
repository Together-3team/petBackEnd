import express, { Router } from 'express'
import { ReviewController } from '../controllers'
import passport from 'passport'
import { validateDto } from '../middleware';
import { ReviewCreateRequestDto } from '../dtos';

const ReviewRouter: Router = express.Router()
const reviewController = new ReviewController();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: 리뷰 관련 API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ReviewResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         rating:
 *           type: number
 *         reviewImages:
 *           type: string
 *         description:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /review/new:
 *   post:
 *     summary: 새로운 리뷰 작성
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: 새로운 리뷰 데이터를 포함한 요청 본문
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewCreateRequestDto'
 *     responses:
 *       200:
 *         description: 리뷰 작성 성공
 *       400:
 *         description: 잘못된 요청
 *       401:
 *         description: 인증 실패
 *       500:
 *         description: 서버 오류
 */
ReviewRouter.post('/new',
    passport.authenticate('jwt', { session: false }),
    validateDto(ReviewCreateRequestDto),
    reviewController.createReview);

/**
 * @swagger
 * /review/{rid}:
 *   get:
 *     summary: 특정 리뷰 조회
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rid
 *         required: true
 *         schema:
 *           type: integer
 *         description: 조회할 리뷰의 ID
 *     responses:
 *       200:
 *         description: 리뷰 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReviewResponseDto'
 *       401:
 *         description: 인증 실패
 *       403:
 *         description: 권한 없음
 *       404:
 *         description: 리뷰를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */

ReviewRouter.get('/detail/:rid', passport.authenticate('jwt', { session: false }), reviewController.getMyReview)

/**
 * @swagger
 * /review/reviewable:
 *   get:
 *     summary: 리뷰 가능한 상품 목록 조회
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: 페이지 번호
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         required: false
 *         description: 페이지 크기
 *     responses:
 *       200:
 *         description: 리뷰 가능한 상품 목록
 *       400:
 *         description: 잘못된 요청
 *       401:
 *         description: 인증 실패
 *       500:
 *         description: 서버 오류
 */
ReviewRouter.get('/reviewable', passport.authenticate('jwt', { session: false }), reviewController.getReviewable);

/**
 * @swagger
 * /review/wrote-reviews:
 *   get:
 *     summary: 작성한 리뷰 목록 조회
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: 페이지 번호
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         required: false
 *         description: 페이지 크기
 *     responses:
 *       200:
 *         description: 작성한 리뷰 목록
 *       400:
 *         description: 잘못된 요청
 *       401:
 *         description: 인증 실패
 *       500:
 *         description: 서버 오류
 */
ReviewRouter.get('/wrote-reviews', passport.authenticate('jwt', { session: false }), reviewController.getWroteReviews);


/**
 * @swagger
 * /review/{rid}:
 *   delete:
 *     summary: 리뷰 삭제
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rid
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the review to remove
 *     responses:
 *       200:
 *         description: Successfully removed the review
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: Success
 *       403:
 *         description: Unauthorized operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
ReviewRouter.delete('/:rid', passport.authenticate('jwt', { session: false }), reviewController.removeReview);

export default ReviewRouter