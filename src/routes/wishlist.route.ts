import express, { Router } from 'express'
import { WishlistController } from '../controllers'
import passport from 'passport'

const WishlistRouter: Router = express.Router()
const wishlistController = new WishlistController()

/**
 * @swagger
 * tags:
 *   name: Wishlists
 *   description: 위시리스트
 */

/**
 * @swagger
 * /wishlists:
 *   get:
 *     summary: 위시리스트 조회
 *     tags: [Wishlists]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 위시리스트 리스트
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WishlistList'
 *       404:
 *         description: 존재하지 않는 사용자입니다
 */
WishlistRouter.get('/', passport.authenticate('jwt', { session: false }), wishlistController.getWishlistsByUser)

/**
 * @swagger
 * /wishlists:
 *   post:
 *     summary: 위시리스트 등록
 *     tags: [Wishlists]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *                 description: 상품 ID
 *     responses:
 *       200:
 *         description: 위시리스트 등록
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wishlist'
 *       500:
 *         description: Internal server error
 */
WishlistRouter.post('/', passport.authenticate('jwt', { session: false }), wishlistController.createWishlist)

/**
 * @swagger
 * /wishlists/{id}:
 *   delete:
 *     summary: 위시리스트 삭제
 *     tags: [Wishlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: 위시리스트 ID
 *     responses:
 *       200:
 *         description: 삭제된 위시리스트
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wishlist'
 *       500:
 *         description: Internal server error
 */
WishlistRouter.delete('/:id', passport.authenticate('jwt', { session: false }), wishlistController.deleteWishlist)

export default WishlistRouter