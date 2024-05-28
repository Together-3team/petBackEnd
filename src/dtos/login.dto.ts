/**
 * @swagger
 * components:
 *   schemas:
 *     LoginDto:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: 사용자 이메일
 *         password:
 *           type: string
 *           description: 사용자 비밀번호
 */
export class LoginDto {
  name: string
  password: string

  constructor(name: string, password: string) {
    this.name = name;
    this.password = password;
  }
}