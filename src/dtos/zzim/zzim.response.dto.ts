import { Product } from "../../entities"

/**
 * @swagger
 * components:
 *   schemas:
 *     ZzimResponseDto:
 *       type: object
 *       properties:
 *         product:
 *           $ref: '#/components/schemas/ProductList'
 *     ZzimResponseListDto:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/ZzimResponseDto'
 */
export class ZzimResponseDto {
  product!: Product
}