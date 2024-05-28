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
 *     OptionCombination:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 고유 ID
 *         optionCombination:
 *           type: string
 *           maxLength: 15
 *           description: 옵션 조합
 *         combinationPrice:
 *           type: integer
 *           description: 조합 가격
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: 생성일
 *         productDetailId:
 *           type: integer
 *           nullable: true
 *           description: 상품 디테일 ID
 *     ProductDetailResponseDTO:
 *       type: object
 *       properties:
 *         productImages:
 *           type: string
 *           nullable: true
 *           description: 상품 이미지들
 *         originalPrice:
 *           type: number
 *           nullable: true
 *           description: 원가
 *         productId:
 *           type: integer
 *           nullable: true
 *           description: 상품 ID
 *         price:
 *           type: number
 *           nullable: true
 *           description: 가격
 *         options:
 *           type: object
 *           nullable: true
 *           description: 상품 옵션들
 *         thumbNailImage:
 *           type: string
 *           nullable: true
 *           description: 썸네일 이미지
 *         optionCombinations:
 *           type: array
 *           nullable: true
 *           items:
 *             $ref: '#/components/schemas/OptionCombination'
 *           description: 상품 옵션 조합들
 *         title:
 *           type: string
 *           nullable: true
 *           description: 상품 제목
 *         category:
 *           type: integer
 *           nullable: true
 *           description: 카테고리 ID
 *         descriptionImages:
 *           type: string
 *           nullable: true
 *           description: 설명 이미지들
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

/**
 * @swagger
 * /products/detail/{id}:
 *   get:
 *     summary: 제품 상세 정보 가져오는 엔드포인트
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 제품 ID
 *     responses:
 *       200:
 *         description: 요청 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductDetailResponseDTO'
 *       404:
 *         description: 제품을 찾을 수 없음
 *       500:
 *         description: Internal server error
 */
ProductRouter.get('/detail/:id', productController.getProductDetail);

export default ProductRouter