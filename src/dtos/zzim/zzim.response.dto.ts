import { IsInt } from "class-validator"
import { Product } from "../../entities"

/**
 * @swagger
 * components:
 *   schemas:
 *     ZzimResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         product:
 *           $ref: '#/components/schemas/ProductList'
 *     ZzimListResponseDto:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/ZzimResponseDto'
 */
export class ZzimResponseDto {
  @IsInt()
  id!: number

  product!: Product
}