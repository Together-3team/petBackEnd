import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp } from 'typeorm'
import { Option, Product, ProductDetail } from '../entities'

/**
 * @swagger
 * components:
 *   schemas:
 *     OptionCombination:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 고유 ID
 *         optionCombination:
 *           type: string
 *           maxLength: 15
 *           description: 옵션 조합
 *         combinationPrice:
 *           type: integer
 *           description: 조합 가격
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: 생성일
 *         productDetailId:
 *           type: integer
 *           nullable: true
 *           description: 상품 디테일 ID
 */

@Entity()
export class OptionCombination {
  /**
   * 고유 ID
   */
  @PrimaryGeneratedColumn()
  id?: number;

  /**
  * 옵션 조합
  */
  @Column({ type: 'varchar', length: 15 })
  optionCombination?: string;

  /**
   * 조합 가격
   */
  @Column({ type: 'int' })
  combinationPrice?: number;

  /**
   * 생성일
   */
  @CreateDateColumn()
  createdAt?: Timestamp;

  /**
   * 상품 디테일 참조 키
   */
  @ManyToOne(() => Product, (Product: { id: any; }) => Product.id, { nullable: true })
  productId?: Product;

}