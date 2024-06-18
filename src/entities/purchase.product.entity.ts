import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm'
import { User, Delivery, SelectedProduct, GroupBuying, Purchase, Review } from '../entities'

/**
 * @swagger
 * components:
 *   schemas:
 *     PurchaseProduct:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 고유 ID
 *         user:
 *           $ref: '#/components/schemas/User'
 *         groupBuying:
 *           $ref: '#/components/schemas/GroupBuying'
 *         purchase:
 *           $ref: '#/components/schemas/Purchase'
 *         title:
 *           type: string
 *           description: 상품 이름
 *         status:
 *           type: integer
 *           description: 배송 상태
 *         combinationName:
 *           type: string
 *           description: 옵션 조합명
 *         quantity:
 *           type: integer
 *           description: 수량
 *         originalPrice:
 *           type: integer
 *           description: 원가
 *         price:
 *           type: integer
 *           description: 할인가
 *         combinationPrice:
 *           type: integer
 *           description: 조합가격
 *         thumbNailImage:
 *           type: string
 *           description: 썸네일 이미지
 *         deliveryCompany:
 *           type: string
 *           description: 배송 회사
 *         trackingNumber:
 *           type: string
 *           description: 송장 번호
 *         productId:
 *           type: integer
 *           description: 물품 ID
 *         createdAt:
 *           type: string
 *           format: Timestamp
 *           description: 생성일
 *       required:
 *         - id
 *         - user
 *         - groupBuying
 *         - purchase
 *         - title
 *         - status
 *         - combinationName
 *         - quantity
 *         - originalPrice
 *         - price
 *         - combinationPrice
 *         - thumbNailImage
 *         - deliveryCompany
 *         - trackingNumber
 *         - createdAt
 *     PurchaseProductList:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/PurchaseProduct'
 */
@Entity()
export class PurchaseProduct {
  @PrimaryGeneratedColumn('increment')
  id!: number

  @CreateDateColumn()
  createdAt!: Date | Timestamp

  @ManyToOne(() => User, { eager: true })
  user!: User

  @ManyToOne(() => GroupBuying, groupBuying => groupBuying.purchaseProducts)
  groupBuying?: GroupBuying

  @ManyToOne(() => Purchase, purchase => purchase.purchaseProducts)
  purchase!: Purchase

  @Column({ type: 'varchar', length: 30 })
  title!: string;

  @Column({type: 'tinyint', nullable: false, default: 0 })
  status: number = 2;

  @Column( { type: 'varchar', length: 100 })
  combinationName!: string;

  @Column({ type: 'int', default: 0 })
  quantity!: number;

  @Column({ type: 'int', default: 0 })
  originalPrice!: number;

  @Column({ type: 'int', default: 0 })
  price!: number;

  @Column({ type: 'int', default: 0 })
  combinationPrice!: number;

  @Column({ type: 'text', nullable: true })
  thumbNailImage!: string;

  @OneToOne(() => Review, (review) => review.purchaseProduct)
  @JoinColumn()
  review!: Review

  @Column({ type: 'varchar', length: 20, nullable: true })
  deliveryCompany?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  trackingNumber?: string;

  @Column({ type: 'bigint'})
  productId?: number;
}