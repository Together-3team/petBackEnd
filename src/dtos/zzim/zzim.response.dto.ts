import { IsInt } from "class-validator"
import { Product, User } from "../../entities"
import { Exclude, Expose } from "class-transformer"
import { timestamp } from "aws-sdk/clients/cloudfront"

/**
 * @swagger
 * components:
 *   schemas:
 *     ZzimResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         product:
 *           $ref: '#/components/schemas/ProductResponseDto'
 *     ZzimListResponseDto:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/ZzimResponseDto'
 */
export class ZzimResponseDto {
  @Expose()
  @IsInt()
  id!: number

  @Exclude()
  user!: User

  @Expose()
  product!: Product

  @Exclude()
  createdAt!: timestamp
}