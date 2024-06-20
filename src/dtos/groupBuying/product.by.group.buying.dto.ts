import { IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GroupUserDto } from './group.user.dto';

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductByGroupBuyingDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Group Buying ID
 *         status:
 *           type: integer
 *           description: Group Buying status
 *         groupUsers:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/GroupUserDto'
 */

export class ProductByGroupBuyingDto {
  @IsNumber()
  id?: number;

  @IsNumber()
  status?: number;

  @ValidateNested({ each: true })
  @Type(() => GroupUserDto)
  userGroup?: GroupUserDto[];
}