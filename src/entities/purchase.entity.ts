import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm"
import { User, Product, Delivery, SelectedProduct } from "../entities"
import { PurchaseProduct } from './purchase.product.entity'

/**
 * @swagger
 * components:
 *   schemas:
 *     Purchase:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 고유 ID
 *         user:
 *           $ref: '#/components/schemas/User'
 *         deliveryName:
 *           type: string
 *           description: 배송지명
 *         recipient:
 *           type: string
 *           description: 수령인
 *         recipientPhoneNumber:
 *           type: string
 *           description: 수령인 연락처
 *         zipCode:
 *           type: integer
 *           description: 우편번호
 *         address:
 *           type: string
 *           description: 주소지
 *         detailedAddress:
 *           type: string
 *           description: 상세 주소
 *         deliveryMessage:
 *           type: string
 *           description: 배송 메시지
 *         purchaseProducts:
 *           $ref: '#/components/schemas/PurchaseProductList'
 *         orderId:
 *           type: string
 *           description: 결제 ID
 *         paymentKey:
 *           type: string
 *           description: 결제 키
 *         paymentStatus:
 *           type: integer
 *           description: 결제 상태
 *         createdAt:
 *           type: string
 *           format: Timestamp
 *           description: 생성일
 *       required:
 *         - id
 *         - user
 *         - delivery
 *         - purchaseProducts
 *         - orderId
 *         - paymentKey
 *         - paymentStatus
 *         - createdAt
 */

@Entity('purchase')
export class Purchase {
  @PrimaryGeneratedColumn('increment')
  id!: number

  @CreateDateColumn()
  createdAt!: Date | Timestamp

  @ManyToOne(() => User, { eager: true })
  user!: User

  @Column('varchar', {length: 30})
  deliveryName!: string

  @Column('varchar', {length: 30})
  recipient!: string

  @Column('varchar', {length: 20})
  recipientPhoneNumber!: string

  @Column('int')
  zipCode!: number

  @Column('varchar', {length: 30})
  address!: string

  @Column('varchar', {length: 30})
  detailedAddress!: string

  @Column('varchar', {length: 30})
  deliveryMessage?: string

  @OneToMany(() => PurchaseProduct, (purchaseProduct) => purchaseProduct.purchase, { eager: true, cascade: true })
  purchaseProducts!: PurchaseProduct[];

  @Column({ type: 'varchar', length: 30, unique: true })
  orderId!: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  paymentKey?: string;
  
  @Column({ type: 'tinyint' })
  paymentStatus: number = 0;

}