import { IsBoolean, IsInt, IsOptional, IsString, IsUrl, Matches } from "class-validator"

/**
 * @swagger
 * components:
 *   schemas:
 *     UserUpdateRequestDto:
 *       type: object
 *       properties:
 *         nickname:
 *           type: string
 *           description: 사용자 닉네임
 *         phoneNumber:
 *           type: string
 *           example: 010-1234-5678
 *           pattern: ^010-\\d{4}-\\d{4}$
 *           description: 사용자 휴대폰 번호
 *         profileImage:
 *           type: string
 *           format: uri
 *           description: 사용자 프로필 이미지
 *         isSubscribedToPromotions:
 *           type: boolean
 *           description: 광고성 정보 수신 여부
 *         preferredPet:
 *           type: number
 *           description: 선호하는 반려동물
 */
export class UserUpdateRequestDto {
  @IsOptional()
  @IsString()
  nickname?: string

  @IsOptional()
  @IsString()
  @Matches(/^010-\d{4}-\d{4}$/, {message: 'phoneNumber must be a valid Korean phone number (010-XXXX-XXXX)'})
  phoneNumber?: string

  @IsOptional()
  @IsUrl()
  profileImage?: string

  @IsOptional()
  @IsBoolean()
  isSubscribedToPromotions?: boolean

  @IsOptional()
  @IsInt()
  preferredPet?: number
}