import { IsInt, IsString } from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     ReviewCreateRequestDto:
 *       type: object
 *       required:
 *         - productId
 *         - purchaseProductId
 *         - rating
 *         - decription
 *         - reviewImages
 *       properties:
 *         productId:
 *           type: integer
 *         purchaseProductId:
 *           type: integer
 *         rating:
 *           type: integer
 *         description:
 *           type: string
 *         reviewImages:
 *           type: string
 */
export class ReviewCreateRequestDto {
  @IsInt()
  productId!: number

  @IsInt()
  purchaseProductId!: number

  @IsInt()
  rating!: number

  @IsString()
  reviewImages!: string

  @IsString()
  description!: string
}