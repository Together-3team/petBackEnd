import { IsBoolean, IsString } from "class-validator"

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthRegisteredResponseDto:
 *       type: object
 *       properties:
 *         registered:
 *           type: boolean
 *           description: 회원 가입 여부
 *         accessToken:
 *           type: string
 *           description: 엑세스 토큰
 *         refreshToken:
 *           type: string
 *           description: 리프레시 토큰
 */
export class AuthRegisteredResponseDto {
  @IsBoolean()
  registered!: boolean

  @IsString()
  accessToken!: string

  @IsString()
  refreshToken!: string
}