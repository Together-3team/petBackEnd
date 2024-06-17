import { Product } from "../entities"

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateZzimDto:
 *       type: object
 *       required:
 *         - product
 *       properties:
 *         product:
 *           type: Product
 *           description: 상품
 */
export class CreateZzimDto {
  product: Product

  constructor(product: Product) {
    this.product = product
  }
}
