import { IsNumber } from 'class-validator'

/**
 * @swagger
 * components:
 *   schemas:
 *     GroupUserDto:
 *       type: object
 *       properties:
 *         nickname:
 *           type: string
 *           description: User nickname
 */

export class GroupUserDto {
  @IsNumber()
  nickname?: string
}