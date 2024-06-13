import { IsInt, IsString } from "class-validator"
import { ProductResponseDto } from "../product"
import { Exclude, Expose } from "class-transformer"
import { Timestamp } from "typeorm"

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
 *         amount:
 *           type: integer
 */
export class OptionCombinationResponseDto {
  @Expose()
  @IsInt()
  id!: number

  @Expose()
  product!: ProductResponseDto

  @Expose()
  @IsString()
  optionCombination!: string

  @Expose()
  @IsString()
  combinationName!: string

  @Expose()
  @IsInt()
  combinationPrice!: number

  @Expose()
  @IsInt()
  amount!: number

  @Exclude()
  createdAt!: Timestamp
}