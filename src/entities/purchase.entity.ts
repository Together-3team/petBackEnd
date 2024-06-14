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
 *         delivery:
 *           $ref: '#/components/schemas/Delivery'
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
 *         deliveryMessage:
 *           type: string
 *           description: 배송 메시지
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

  @ManyToOne(() => Delivery, { eager: true })
  delivery!: Delivery

  @OneToMany(() => PurchaseProduct, purchaseProduct => purchaseProduct.purchase, { eager: true, cascade: true })
  purchaseProducts!: PurchaseProduct[];

  @Column({ type: 'varchar', length: 30, unique: true })
  orderId!: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  paymentKey!: string;
  
  @Column({ type: 'tinyint' })
  paymentStatus: number = 0;    
  
  @Column({ type: 'varchar', length: 30, nullable: true })
  deliveryMessage?: string;    
}