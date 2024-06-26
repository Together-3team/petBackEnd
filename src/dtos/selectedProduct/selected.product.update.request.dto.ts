import { IsInt, IsOptional } from "class-validator"

/**
 * @swagger
 * components:
 *   schemas:
 *     SelectedProductUpdateRequestDto:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           description: 상태
 *         quantity:
 *           type: integer
 *           description: 수량
 */
export class SelectedProductUpdateRequestDto {
  @IsOptional()
  @IsInt()
  status?: number

  @IsOptional()
  @IsInt()
  quantity?: number
}