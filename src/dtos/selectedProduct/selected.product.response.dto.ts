import { IsInt, IsString } from "class-validator"
import { OptionCombinationResponseDto } from "../optionCombination"
import { Exclude, Expose } from "class-transformer"
import { GroupBuying, Purchase, User } from "../../entities"
import { Timestamp } from "typeorm"

/**
 * @swagger
 * components:
 *   schemas:
 *     SelectedProductResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         optionCombination:
 *           $ref: '#/components/schemas/OptionCombinationResponseDto'
 *         quantity:
 *           type: integer
 *     SelectedProductListResponseDto:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/SelectedProductResponseDto'
 */
export class SelectedProductResponseDto {
  @Expose()
  @IsInt()
  id!: number

  @Expose()
  optionCombination!: OptionCombinationResponseDto

  @Expose()
  @IsInt()
  quantity!: number

  @Exclude()
  status!: number

  @Exclude()
  createdAt!: Timestamp

  @Exclude()
  groupBuying?: GroupBuying

  @Exclude()
  user!: User

  @Exclude()
  purchase?: Purchase
}