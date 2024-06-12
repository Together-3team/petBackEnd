import { IsInt, IsString } from "class-validator"

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductResponseDto:
 *       type: object
 *         properties:
 *           id:
 *             type: integer
 *           originalPrice:
 *             type: integer
 *           price:
 *             type: integer
 *           title:
 *             type: string
 *           thumbNailImage:
 *             type: string
 */
export class ProductResponseDto {
  @IsInt()
  id!: number

  @IsInt()
  originalPrice!: number

  @IsInt()
  price!: number

  @IsString()
  title!: string

  @IsString()
  thumbNailImage!: string
}