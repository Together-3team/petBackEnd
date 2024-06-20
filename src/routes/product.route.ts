import express, { Router } from 'express'
import { ProductController } from '../controllers'
import passport from 'passport';

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
 *         reviewRating:
 *           type: number
 *           nullable: false
 *           description: 리뷰 평점
 *         reviewCount:
 *           type: number
 *           nullable: false
 *           description: 리뷰 갯수
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
 *     summary: 제품 목록 조회
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
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
 *       - in: query
 *         name: petType
 *         schema:
 *           type: integer
 *           default: 0
 *         description: 선호하는 반려동물 (0 - 전체, 1 - 강아지, 2 - 고양이)
 *       - in: query
 *         name: productType
 *         schema:
 *           type: integer
 *           default: 0
 *         description: 찾아보려는 물품 종류 (0 - 전체, 1 - 사료, 2 - 간식, 3 - 용품)
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: integer
 *           default: 0
 *         description: 정렬 방식 (0 - 최신 순, 1 - 별점 높은 순, 2 - 별점 낮은 순, 3 - 가격 높은 순, 4 - 가격 낮은 순)
 *     responses:
 *       200:
 *         description: 요청 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductPaginationResponseDto'
 *       500:
 *         description: Internal server error
 */
ProductRouter.get('/', 
    passport.authenticate('jwt-guest', { session: false }),
    productController.getProducts);

/**
 * @swagger
 * /products/recommended:
 *   get:
 *     summary: 추천 제품 목록 조회
 *     description: 가장 최근에 구매한 상품의 productType을 가져옵니다.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
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
 *       - in: query
 *         name: petType
 *         schema:
 *           type: integer
 *           default: 0
 *         description: 선호하는 반려동물 (0 - 전체, 1 - 강아지, 2 - 고양이)
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: integer
 *           default: 0
 *         description: 정렬 방식 (0 - 최신 순, 1 - 별점 높은 순, 2 - 별점 낮은 순, 3 - 가격 높은 순, 4 - 가격 낮은 순)
 *     responses:
 *       200:
 *         description: 요청 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductPaginationResponseDto'
 *       500:
 *         description: Internal server error
 */
ProductRouter.get('/recommended', 
    passport.authenticate('jwt-guest', { session: false }),
    productController.getRecommendedProducts);

/**
 * @swagger
 * /products/hot:
 *   get:
 *     summary: 인기 제품 목록 조회
 *     description: 모든 productType, 평균 별점이 4.5 이상인 제품을 가져옵니다.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
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
 *       - in: query
 *         name: petType
 *         schema:
 *           type: integer
 *           default: 0
 *         description: 선호하는 반려동물 (0 - 전체, 1 - 강아지, 2 - 고양이)
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: integer
 *           default: 0
 *         description: 정렬 방식 (0 - 최신 순, 1 - 별점 높은 순, 2 - 별점 낮은 순, 3 - 가격 높은 순, 4 - 가격 낮은 순)
 *     responses:
 *       200:
 *         description: 요청 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductPaginationResponseDto'
 *       500:
 *         description: Internal server error
 */
ProductRouter.get('/hot', 
    passport.authenticate('jwt-guest', { session: false }),
    productController.getHotProducts);

/**
 * @swagger
 * /products/search:
 *   get:
 *     summary: 제품 목록 검색
 *     description: 검색어 기반이기 때문에 petType, productType 필터링이 없습니다.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
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
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: integer
 *           default: 0
 *         description: 정렬 방식 (0 - 최신 순, 1 - 별점 높은 순, 2 - 별점 낮은 순, 3 - 가격 높은 순, 4 - 가격 낮은 순)
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: 검색어
 *     responses:
 *       200:
 *         description: 요청 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductPaginationResponseDto'
 *       500:
 *         description: Internal server error
 */
ProductRouter.get('/search', 
    passport.authenticate('jwt-guest', { session: false }),
    productController.searchProducts);

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