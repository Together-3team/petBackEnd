import { IsInt } from "class-validator"

/**
 * @swagger
 * components:
 *   schemas:
 *     ZzimCreateRequestDto:
 *       type: object
 *       required:
 *         - productId
 *       properties:
 *         productId:
 *           type: integer
 *           description: 상품 ID
 */
export class ZzimCreateRequestDto {
  @IsInt()
  productId!: number
}
