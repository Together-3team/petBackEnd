import { IsBoolean, IsInt, IsString, Matches } from "class-validator"
import { Exclude, Expose } from "class-transformer"
import { Timestamp } from "typeorm"
import { User } from "../../entities"

/**
 * @swagger
 * components:
 *   schemas:
 *     DeliveryResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         recipient:
 *           type: string
 *         recipientPhoneNumber:
 *           type: string
 *           example: 010-1234-5678
 *           pattern: ^010-\\d{4}-\\d{4}$
 *         zipCode:
 *           type: number
 *         address:
 *           type: string
 *         detailedAddress:
 *           type: string
 *         isDefault:
 *           type: boolean
 *     DeliveryListResponseDto:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/DeliveryResponseDto'
 */
export class DeliveryResponseDto {
  @Expose()
  @IsInt()
  id!: number

  @Expose()
  @IsString()
  name!: string

  @Expose()
  @IsString()
  recipient!: string

  @Expose()
  @IsString()
  @Matches(/^010-\d{4}-\d{4}$/, {message: 'phoneNumber must be a valid Korean phone number (010-XXXX-XXXX)'})
  recipientPhoneNumber!: string

  @Expose()
  @IsInt()
  zipCode!: number

  @Expose()
  @IsString()
  address!: string

  @Expose()
  @IsString()
  detailedAddress!: string

  @Expose()
  @IsBoolean()
  isDefault!: boolean

  @Exclude()
  createdAt!: Timestamp

  @Exclude()
  user!: User
}