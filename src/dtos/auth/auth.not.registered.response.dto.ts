import { IsBoolean, IsEmail, IsString } from "class-validator"

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthNotRegisteredResponseDto:
 *       type: object
 *       properties:
 *         registered:
 *           type: boolean
 *           description: 회원 가입 여부
 *         email:
 *           type: string
 *           format: email
 *           description: 이메일
 *         profileToken:
 *           type: string
 *           description: 프로필 정보 토큰
 */
export class AuthNotRegisteredResponseDto {
  @IsBoolean()
  registered!: boolean

  @IsEmail()
  email!: string

  @IsString()
  profileToken!: string
}