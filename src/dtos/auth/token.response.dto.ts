import { IsString } from "class-validator"

/**
 * @swagger
 * components:
 *   schemas:
 *     TokenResponseDto:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *         refreshToken:
 *           type: string
 */
export class TokenResponseDto {
  @IsString()
  accessToken!: string

  @IsString()
  refreshToken!: string
}