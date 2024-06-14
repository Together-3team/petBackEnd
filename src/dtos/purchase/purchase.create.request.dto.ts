import { ArrayNotEmpty, IsArray, IsInt, IsOptional, IsString } from "class-validator"

/**
 * @swagger
 * components:
 *   schemas:
 *     PurchaseCreateRequestDto:
 *       type: object
 *       required:
 *         - deliveryId
 *         - selectedProductIds
 *         - orderId
 *         - paymentKey
 *       properties:
 *         deliveryId:
 *           type: integer
 *           description: 배송지 ID
 *         selectedProductIds:
 *           type: array
 *           items:
 *             type: integer
 *         orderId:
 *           type: string
 *         paymentKey:
 *           type: string
 *         deliveryMessage:
 *           type: string
 */
export class PurchaseCreateRequestDto {
  @IsInt()
  deliveryId!: number

  @IsArray()
  @ArrayNotEmpty()
  selectedProductIds!: number[]

  @IsString()
  orderId!: string

  @IsString()
  paymentKey!: string

  @IsOptional()
  @IsString()
  deliveryMessage?: string
}