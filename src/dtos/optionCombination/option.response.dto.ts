import { IsInt, IsString } from "class-validator"
import { Exclude, Expose } from "class-transformer"
import { Timestamp } from "typeorm"

/**
 * @swagger
 * components:
 *   schemas:
 *     OptionResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         optionValue:
 *           type: string
 *         optionPrice:
 *           type: number
 */
export class OptionResponseDto {
  @Expose()
  @IsInt()
  id!: number

  @Exclude()
  @IsString()
  optionKey!: string

  @Expose()
  @IsString()
  optionValue!: string

  @Expose()
  @IsInt()
  optionPrice!: number

  @Exclude()
  createdAt!: Timestamp
}