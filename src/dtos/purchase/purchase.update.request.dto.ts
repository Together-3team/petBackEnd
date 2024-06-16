import { ArrayNotEmpty, IsArray, IsInt, IsOptional, IsString } from "class-validator"

/**
 * @swagger
 * components:
 *   schemas:
 *     PurchaseUpdateRequestDto:
 *       type: object
 *       properties:
 *         paymentStatus:
 *           type: integer
 */
export class PurchaseUpdateRequestDto {
  @IsInt()
  @IsOptional()
  paymentStatus?: number
}