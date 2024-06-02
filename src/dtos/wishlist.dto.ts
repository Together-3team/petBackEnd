import { Product } from "../entities"

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateWishlistDto:
 *       type: object
 *       required:
 *         - product
 *       properties:
 *         product:
 *           type: Product
 *           description: 상품
 */
export class CreateWishlistDto {
  product: Product

  constructor(product: Product) {
    this.product = product
  }
}
