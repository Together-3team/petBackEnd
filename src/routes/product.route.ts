import express, { Router } from 'express'
import { ProductController } from '../controllers'

const ProductRouter: Router = express.Router()
const productController = new ProductController();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductList:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 고유 ID
 *         title:
 *           type: string
 *           description: 상품명
 *         originalPrice:
 *           type: integer
 *           description: 원가
 *         price:
 *           type: integer
 *           description: 판매가
 *         discountRate:
 *           type: integer
 *           description: 할인율
 *         thumbNailImage:
 *           type: string
 *           nullable: true
 *           description: 썸네일 이미지
 *         isDeleted:
 *           type: integer
 *           description: 삭제 여부
 *         createdAt:
 *           type: string
 *           format: timestamp
 *           description: 생성일
 *         updatedAt:
 *           type: string
 *           format: timestamp
 *           description: 수정일
 *       required:
 *         - id
 *         - title
 *         - originalPrice
 *         - price
 *         - discountRate
 *         - isDeleted
 *         - createdAt
 *         - updatedAt
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: 제품 목록 가져오는 엔드포인트
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: 페이지 번호
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 5
 *         description: 페이지당 항목 수
 *     responses:
 *       200:
 *         description: 요청 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductList'
 *       500:
 *         description: Internal server error
 */
ProductRouter.get('/', productController.getProductList);

export default ProductRouter