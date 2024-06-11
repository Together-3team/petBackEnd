import { IsBoolean, IsEmail, IsString, IsUrl, Matches } from "class-validator"

/**
 * @swagger
 * components:
 *   schemas:
 *     UserCreateRequestDto:
 *       type: object
 *       properties:
 *         nickname:
 *           type: string
 *           description: 사용자 닉네임
 *         email:
 *           type: string
 *           format: email
 *           description: 사용자 이메일 주소
 *         phoneNumber:
 *           type: string
 *           example: 010-1234-5678
 *           pattern: ^010-\\d{4}-\\d{4}$
 *           description: 사용자 휴대폰 번호
 *         profileImage:
 *           type: string
 *           format: uri
 *           description: 사용자 프로필 이미지
 *         snsId:
 *           type: string
 *           description: 플랫폼 ID
 *         provider:
 *           type: string
 *           description: 로그인 플랫폼
 *         isSubscribedToPromotions:
 *           type: boolean
 *           description: 광고성 정보 수신 여부
 */
export class UserCreateRequestDto {
  @IsString()
  nickname!: string

  @IsEmail()
  email!: string

  @IsString()
  @Matches(/^010-\d{4}-\d{4}$/, {message: 'phoneNumber must be a valid Korean phone number (010-XXXX-XXXX)'})
  phoneNumber!: string

  @IsUrl()
  profileImage!: string

  @IsString()
  snsId!: string

  @IsString()
  provider!: string

  @IsBoolean()
  isSubscribedToPromotions!: boolean
}