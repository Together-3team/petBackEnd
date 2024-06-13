import { IsInt } from "class-validator"

/**
 * @swagger
 * components:
 *   schemas:
 *     SelectedProductCreateRequestDto:
 *       type: object
 *       required:
 *         - optionCombinationId
 *         - quantity
 *       properties:
 *         optionCombinationId:
 *           type: integer
 *           description: 옵션 조합 ID
 *         quantity:
 *           type: integer
 *           description: 수량
 */
export class SelectedProductCreateRequestDto {
  @IsInt()
  optionCombinationId!: number

  @IsInt()
  quantity!: number
}