/**
 * @swagger
 * components:
 *   schemas:
 *     CreateSelectedProductDto:
 *       type: object
 *       required:
 *         - optionCombinationId
 *         - quantity
 *       properties:
 *         optionCombinationId:
 *           type: integer
 *           description: 옵션 조합 ID
 *         quantity:
 *           type: integer
 *           description: 수량
 */
export class CreateSelectedProductDto {
  optionCombinationId: number
  quantity: number

  constructor(optionCombinationId: number, quantity: number) {
    this.optionCombinationId = optionCombinationId
    this.quantity = quantity
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateSelectedProductDto:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           description: 상태
 *         quantity:
 *           type: integer
 *           description: 수량
 */
export class UpdateSelectedProductDto {
  status?: number
  quantity?: number
}
