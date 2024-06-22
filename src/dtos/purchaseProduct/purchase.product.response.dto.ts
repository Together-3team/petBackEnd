import { IsInt, IsString } from "class-validator"
import { GroupBuying, Product, Purchase, User } from "../../entities"
import { Exclude, Expose } from "class-transformer"
import { Timestamp } from "typeorm"

/**
 * @swagger
 * components:
 *   schemas:
 *     PurchaseProductResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         status:
 *           type: integer
 *         combinationName:
 *           type: string
 *         quantity:
 *           type: integer
 *         originalPrice:
 *           type: integer
 *         price:
 *           type: integer
 *         combinationPrice:
 *           type: integer
 *         thumbNailImage:
 *           type: string
 *         deliveryCompany:
 *           type: string
 *         trackingNumber:
 *           type: string
 *         productId:
 *           type: integer
 *         createdAt:
 *           type: string
 *           format: date-time
 *     PurchaseProductListResponseDto:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/PurchaseProductResponseDto'
 */
export class PurchaseProductResponseDto {
  @Expose()
  @IsInt()
  id!: number

  @Expose()
  createdAt!: Date | Timestamp

  @Exclude()
  user!: User

  @Exclude()
  groupBuying?: GroupBuying

  @Exclude()
  purchase!: Purchase

  @Expose()
  @IsString()
  title!: string;

  @Expose()
  @IsInt()
  status: number = 0;

  @Expose()
  @IsString()
  combinationName!: string;

  @Expose()
  @IsInt()
  quantity!: number;

  @Expose()
  @IsInt()
  originalPrice!: number;

  @Expose()
  @IsInt()
  price!: number;

  @Expose()
  @IsInt()
  combinationPrice!: number;

  @Expose()
  @IsString()
  thumbNailImage!: string;

  @Expose()
  @IsString()
  deliveryCompany?: string;

  @Expose()
  @IsString()
  trackingNumber?: string;   

  @Exclude()
  @IsInt()
  productId!: number;   
}