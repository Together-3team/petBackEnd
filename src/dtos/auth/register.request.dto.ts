import { IsBoolean, IsString, Matches } from "class-validator"

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterRequestDto:
 *       type: object
 *       properties:
 *         nickname:
 *           type: string
 *         phoneNumber:
 *           type: string
 *           description: Phone number in the format 010-XXXX-XXXX
 *           example: 010-1234-5678
 *           pattern: ^010-\\d{4}-\\d{4}$
 *         isSubscribedToPromotions:
 *           type: boolean
 *         profileToken:
 *           type: string
 *       required:
 *         - nickname
 *         - phoneNumber
 *         - isSubscribedToPromotions
 *         - profileToken
 */
export class RegisterRequestDto {
  @IsString()
  nickname!: string

  @IsString()
  @Matches(/^010-\d{4}-\d{4}$/, {message: 'phoneNumber must be a valid Korean phone number (010-XXXX-XXXX)'})
  phoneNumber!: string

  @IsBoolean()
  isSubscribedToPromotions!: boolean

  @IsString()
  profileToken!: string
}