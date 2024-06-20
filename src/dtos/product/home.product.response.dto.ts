import { Exclude, Expose } from "class-transformer"
import { IsBoolean, IsInt, IsString } from "class-validator"
import { Timestamp } from "typeorm"

/**
 * @swagger
 * components:
 *   schemas:
 *     HomeProductResponseDto:
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
 *     HomeProductListResponseDto:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/HomeProductResponseDto'
 */
export class HomeProductResponseDto {
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
}