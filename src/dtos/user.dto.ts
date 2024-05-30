/**
 * @swagger
 * components:
 *   schemas:
 *     CreateUserDto:
 *       type: object
 *       required:
 *         - nickname
 *         - email
 *         - phoneNumber
 *       properties:
 *         nickname:
 *           type: string
 *           description: 사용자 닉네임
 *         email:
 *           type: string
 *           description: 사용자 이메일 주소
 *         phoneNumber:
 *           type: string
 *           description: 사용자 휴대폰 번호
 */
export class CreateUserDto {
  nickname: string
  email: string
  phoneNumber: string
  profileImage?: string
  snsId?: string
  provider?: string

  constructor(nickname: string, email: string, phoneNumber: string) {
    this.nickname = nickname
    this.email = email
    this.phoneNumber = phoneNumber
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateUserDto:
 *       type: object
 *       properties:
 *         nickname:
 *           type: string
 *           description: 사용자 닉네임
 *         phoneNumber:
 *           type: string
 *           description: 사용자 휴대폰 번호
 *         profileImage:
 *           type: string
 *           description: 사용자 프로필 이미지
 */
export class UpdateUserDto {
  nickname?: string
  phoneNumber?: string
  profileImage?: string
}