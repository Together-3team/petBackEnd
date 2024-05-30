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
 *         password:
 *           type: string
 *           description: 사용자 비밀번호
 *         phoneNumber:
 *           type: string
 *           description: 사용자 휴대폰 번호
 *         profileImage:
 *           type: string
 *           description: 사용자 프로필 이미지
 */
export class UpdateUserDto {
  nickname!: string
  phoneNumber!: string
  profileImage!: string
}