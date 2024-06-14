import { IsInt, IsString } from "class-validator"
import { User } from "../../entities"
import { Exclude, Expose } from "class-transformer"
import { Timestamp } from "typeorm"
import { PurchaseProductResponseDto, DeliveryResponseDto } from "../../dtos"

/**
 * @swagger
 * components:
 *   schemas:
 *     PurchaseResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         delivery:
 *           $ref: '#/components/schemas/DeliveryResponseDto'
 *         purchaseProducts:
 *           $ref: '#/components/schemas/PurchaseProductListResponseDto'
 *         orderId:
 *           type: string
 *         paymentKey:
 *           type: string
 *         paymentStatus:
 *           type: integer
 *         deliveryMessage:
 *           type: string
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
  delivery!: DeliveryResponseDto

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

  @Expose()
  @IsString()
  deliveryMessage?: string;
}