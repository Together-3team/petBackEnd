import { Exclude, Expose } from "class-transformer"
import { IsBoolean, IsInt, IsString } from "class-validator"
import { Timestamp } from "typeorm"
import { OptionCombinationResponseDto } from "../optionCombination"
import { ReviewResponseDto } from "../review"

/**
 * @swagger
 * components:
 *   schemas:
 *     FullProductResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         originalPrice:
 *           type: integer
 *         price:
 *           type: integer
 *         title:
 *           type: string
 *         thumbNailImage:
 *           type: string
 *         petType:
 *           type: integer
 *         productType:
 *           type: integer
 *         averageRating:
 *           type: integer
 *         reviewCount:
 *           type: integer
 *         totalAmount:
 *           type: integer
 *         isZzimed:
 *           type: boolean
 *         options:
 *           type: object
 *           additionalProperties:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/OptionResponseDto'
 *         optionCombinations:
 *           $ref: '#/components/schemas/OptionCombinationListResponseDto'
 *         reviews:
 *           $ref: '#/components/schemas/ReviewListResponseDto'
 */
export class FullProductResponseDto {
  @Expose()
  @IsInt()
  id!: number

  @Expose()
  @IsInt()
  originalPrice!: number

  @Expose()
  @IsInt()
  price!: number

  @Expose()
  @IsString()
  title!: string

  @Expose()
  @IsString()
  thumbNailImage!: string

  @Exclude()
  @IsInt()
  isDeleted!: number

  @Expose()
  @IsInt()
  petType!: number

  @Expose()
  @IsInt()
  productType!: number

  @Exclude()
  createdAt!: Timestamp

  @Exclude()
  updatedAt!: Timestamp
  
  @Expose()
  @IsInt()
  averageRating!: number
  
  @Expose()
  @IsInt()
  reviewCount!: number
  
  @Expose()
  @IsInt()
  totalAmount!: number

  @Expose()
  @IsBoolean()
  isZzimed!: boolean

  @Expose()
  detail!: any

  @Expose()
  options!: any

  @Expose()
  optionCombinations!: OptionCombinationResponseDto[]

  @Expose()
  reviews!: ReviewResponseDto[]

  @Exclude()
  category!: any
}