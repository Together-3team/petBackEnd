/**
 * @swagger
 * components:
 *   schemas:
 *     AuthDto:
 *       type: object
 *       properties:
 *         registered:
 *           type: boolean
 *           description: 회원 가입 여부
 *         profileToken:
 *           type: string
 *           description: 프로필 정보 토큰
 */
export class AuthDto {
    registered!: boolean
    profileToken!: string
  }