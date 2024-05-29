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
 *         password:
 *           type: string
 *           description: 사용자 비밀번호
 *         phoneNumber:
 *           type: string
 *           description: 사용자 휴대폰 번호
 */
export class CreateUserDto {
  nickname: string
  email: string
  password?: string
  phoneNumber: string
  profileImage?: string
  snsId?: string
  provider?: string

  constructor(nickname: string, email: string, phoneNumber: string) {
    this.nickname = nickname
    this.email = email
    this.phoneNumber = phoneNumber
    this.profileImage = ""
  }
}