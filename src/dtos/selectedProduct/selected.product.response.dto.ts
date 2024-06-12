import { IsInt, IsString } from "class-validator"
import { OptionCombinationResponseDto } from "../optionCombination"

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
 */
export class SelectedProductResponseDto {
  @IsInt()
  id!: number

  optionCombination!: OptionCombinationResponseDto

  @IsInt()
  quantity!: number
}