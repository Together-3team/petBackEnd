import { IsInt, IsString } from "class-validator"
import { ProductResponseDto } from "../product"

/**
 * @swagger
 * components:
 *   schemas:
 *     OptionCombinationResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         product:
 *           $ref: '#/components/schemas/ProductResponseDto'
 *         optionCombination:
 *           type: string
 *         combinationName:
 *           type: string
 *         combinationPrice:
 *           type: string
 *         stock:
 *           type: integer
 */
export class OptionCombinationResponseDto {
  @IsInt()
  id!: number

  product!: ProductResponseDto

  @IsString()
  optionCombination!: string

  @IsString()
  combinationName!: string

  @IsInt()
  combinationPrice!: number

  @IsInt()
  stock!: number
}