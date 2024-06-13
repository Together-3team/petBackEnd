import { IsBoolean, IsInt, IsOptional, IsString, Matches } from "class-validator"

/**
 * @swagger
 * components:
 *   schemas:
 *     DeliveryUpdateRequestDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: 배송지명
 *         recipient:
 *           type: string
 *           description: 수령인
 *         recipientPhoneNumber:
 *           type: string
 *           example: 010-1234-5678
 *           pattern: ^010-\\d{4}-\\d{4}$
 *           description: 수령인 연락처
 *         zipCode:
 *           type: integer
 *           description: 우편 번호
 *         address:
 *           type: string
 *           description: 주소지
 *         detailedAddress:
 *           type: string
 *           description: 상세 주소
 *         isDefault:
 *           type: boolean
 *           description: 기본 배송지 여부
 */
export class DeliveryUpdateRequestDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  recipient?: string

  @IsOptional()
  @IsString()
  @Matches(/^010-\d{4}-\d{4}$/, {message: 'phoneNumber must be a valid Korean phone number (010-XXXX-XXXX)'})
  recipientPhoneNumber?: string

  @IsOptional()
  @IsInt()
  zipCode?: number

  @IsOptional()
  @IsString()
  address?: string

  @IsOptional()
  @IsString()
  detailedAddress?: string

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean
}