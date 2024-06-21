import { IsInt, IsString } from "class-validator"
import { Exclude, Expose } from "class-transformer"
import { Timestamp } from "typeorm"
import { User } from "../../entities"

/**
 * @swagger
 * components:
 *   schemas:
 *     ReviewResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         rating:
 *           type: integer
 *         reviewImages:
 *           type: string
 *         description:
 *           type: string
 *     ReviewListResponseDto:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/ReviewResponseDto'
 */
export class ReviewResponseDto {
  @Expose()
  @IsInt()
  id!: number

  @Expose()
  @IsInt()
  rating!: number

  @Expose()
  @IsString()
  reviewImages!: string

  @Expose()
  @IsString()
  description!: string

  @Exclude()
  isDeleted!: number

  @Exclude()
  createdAt!: Timestamp

  @Exclude()
  user!: User

  @Expose()
  reviewerName!: string
  
  @Expose()
  reviewerProfileImage!: string
}