import { OptionCombination } from "../entities"

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateSelectedProductDto:
 *       type: object
 *       required:
 *         - optionCombination
 *         - quantity
 *       properties:
 *         optionCombination:
 *           type: OptionCombination
 *           description: 옵션 조합
 *         quantity:
 *           type: integer
 *           description: 수량
 */
export class CreateSelectedProductDto {
  optionCombination: OptionCombination
  quantity: number

  constructor(optionCombination: OptionCombination, quantity: number) {
    this.optionCombination = optionCombination
    this.quantity = quantity
  }
}
