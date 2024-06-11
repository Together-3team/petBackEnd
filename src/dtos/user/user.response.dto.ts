import { Exclude, Expose } from "class-transformer"
import { IsBoolean, IsDate, IsEmail, IsInt, IsString, IsUrl, Matches } from "class-validator"

/**
 * @swagger
 * components:
 *   schemas:
 *     UserResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 사용자 ID
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
 *           description: 프로필 이미지
 *         provider:
 *           type: string
 *           description: 로그인 플랫폼
 *         isSubscribedToPromotions:
 *           type: boolean
 *           description: 광고성 정보 수신 여부
 */
export class UserResponseDto {
  @Expose()
  @IsInt()
  id!: number

  @Expose()
  @IsString()
  nickname!: string

  @Expose()
  @IsEmail()
  email!: string

  @Expose()
  @IsString()
  @Matches(/^010-\d{4}-\d{4}$/, {message: 'phoneNumber must be a valid Korean phone number (010-XXXX-XXXX)'})
  phoneNumber!: string

  @Expose()
  @IsUrl()
  profileImage!: string

  @Exclude()
  @IsString()
  snsId!: string

  @Expose()
  @IsString()
  provider!: string

  @Expose()
  @IsBoolean()
  isSubscribedToPromotions!: boolean

  @Exclude()
  @IsDate()
  createdAt!: Date

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial)
  }
}