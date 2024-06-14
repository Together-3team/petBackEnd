import { ArrayNotEmpty, IsArray, IsInt, IsOptional, IsString } from "class-validator"

/**
 * @swagger
 * components:
 *   schemas:
 *     PurchaseProductCreateRequestDto:
 *       type: object
 *       required:
 *         - purchaseId
 *         - title
 *         - combinationName
 *         - quantity
 *         - originalPrice
 *         - price
 *         - combinationPrice
 *         - thumbNailImage
 *       properties:
 *         purchaseId:
 *           type: integer
 *         title:
 *           type: string
 *         combinationName:
 *           type: string
 *         quantity:
 *           type: integer
 *         originalPrice:
 *           type: integer
 *         price:
 *           type: integer
 *         combinationPrice:
 *           type: integer
 *         thumbNailImage:
 *           type: string
 */
export class PurchaseProductCreateRequestDto {
  @IsInt()
  purchaseId!: number

  @IsString()
  title!: string

  @IsString()
  combinationName!: string

  @IsInt()
  quantity!: number

  @IsInt()
  originalPrice!: number

  @IsInt()
  price!: number

  @IsInt()
  combinationPrice!: number

  @IsString()
  thumbNailImage!: number
}