import { Exclude, Expose } from "class-transformer"
import { IsBoolean, IsInt, IsString } from "class-validator"
import { Timestamp } from "typeorm"

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductResponseDto:
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
 */
export class ProductResponseDto {
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

  @Exclude()
  @IsInt()
  petType!: number

  @Exclude()
  createdAt!: Timestamp

  @Exclude()
  updatedAt!: Timestamp
}