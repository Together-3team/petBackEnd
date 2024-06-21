import { IsInt, IsString } from "class-validator"
import { Exclude, Expose } from "class-transformer"
import { Timestamp } from "typeorm"

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductDetailResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         product:
 *           $ref: '#/components/schemas/ProductList'
 *     ProductDetailListResponseDto:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/ProductDetailResponseDto'
 */
export class ProductDetailResponseDto {
  @Expose()
  @IsInt()
  id!: number

  @Expose()
  @IsString()
  productImages!: string

  @Expose()
  @IsString()
  descriptionImages!: string

  @Expose()
  @IsString()
  description!: string

  @Exclude()
  createdAt!: Timestamp
}