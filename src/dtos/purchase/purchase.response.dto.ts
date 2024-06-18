import { IsInt, IsString, Matches } from "class-validator"
import { User } from "../../entities"
import { Exclude, Expose } from "class-transformer"
import { Timestamp } from "typeorm"
import { PurchaseProductResponseDto } from "../../dtos"

/**
 * @swagger
 * components:
 *   schemas:
 *     PurchaseResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         deliveryName:
 *           type: string
 *         recipient:
 *           type: string
 *         recipientPhoneNumber:
 *           type: string
 *           example: 010-1234-5678
 *           pattern: ^010-\\d{4}-\\d{4}$
 *         zipCode:
 *           type: integer
 *         address:
 *           type: string
 *         detailedAddress:
 *           type: string
 *         deliveryMessage:
 *           type: string
 *         purchaseProducts:
 *           $ref: '#/components/schemas/PurchaseProductListResponseDto'
 *         orderId:
 *           type: string
 *         paymentKey:
 *           type: string
 *         paymentStatus:
 *           type: integer
 *     PurchaseListResponseDto:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/PurchaseResponseDto'
 */
export class PurchaseResponseDto {
  @Expose()
  @IsInt()
  id!: number

  @Exclude()
  createdAt!: Date | Timestamp

  @Exclude()
  user!: User

  @Expose()
  @IsString()
  deliveryName!: string

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
  @IsString()
  deliveryMessage?: string;

  @Expose()
  purchaseProducts!: PurchaseProductResponseDto[]

  @Expose()
  @IsString()
  orderId!: string;

  @Expose()
  @IsString()
  paymentKey!: string;

  @Expose()
  @IsInt()
  paymentStatus!: number;
}