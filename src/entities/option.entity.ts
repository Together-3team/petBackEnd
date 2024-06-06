import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp } from 'typeorm'
import { Product, ProductDetail } from '../entities'

/**
 * @swagger
 * components:
 *   schemas:
 *     Option:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 고유 ID
 *         optionKey:
 *           type: string
 *           maxLength: 15
 *           description: 옵션 타입
 *         optionValue:
 *           type: string
 *           maxLength: 50
 *           description: 옵션 명
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: 생성일
 *         productDetailId:
 *           type: integer
 *           nullable: false
 *           description: 상품 디테일 ID
 */

@Entity()
export class Option {
  /**
   * 고유 ID
   */
  @PrimaryGeneratedColumn()
  id?: number;

  /**
   * 옵션 타입
   */
  @Column({ type: 'varchar', length: 15 })
  optionKey?: string;

  /**
   * 옵션 명
   */
  @Column({ type: 'varchar', length: 50 })
  optionValue?: string;

  /**
   * 생성일
   */
  @CreateDateColumn()
  createdAt?: Timestamp;

  /**
   * 상품 참조 키
   */
  @ManyToOne(() => Product, (Product: { id: any; }) => Product.id, { nullable: false })
  productId?: Product;

}