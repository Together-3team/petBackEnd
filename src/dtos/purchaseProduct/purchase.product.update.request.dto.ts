import { ArrayNotEmpty, IsArray, IsInt, IsOptional, IsString } from "class-validator"

/**
 * @swagger
 * components:
 *   schemas:
 *     PurchaseProductUpdateRequestDto:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *         deliveryCompany:
 *           type: string
 *         trackingNumber:
 *           type: string
 */
export class PurchaseProductUpdateRequestDto {
  @IsInt()
  @IsOptional()
  status?: number

  @IsString()
  @IsOptional()
  deliveryCompany?: string

  @IsString()
  @IsOptional()
  trackingNumber?: string
}