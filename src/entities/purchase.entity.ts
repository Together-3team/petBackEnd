import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm"
import { User, Product, Delivery, SelectedProduct } from "../entities"

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
 *         delivery:
 *           type: Delivery
 *           description: 배송지
 *         orderId:
 *           type: string
 *           description: 결제 ID
 *         paymentStatus:
 *           type: integer
 *           description: 결제 상태
 *         deliveryCompany:
 *           type: string
 *           description: 배송 회사
 *         trackingNumber:
 *           type: string
 *           description: 송장 번호
 *         discountPrice:
 *           type: integer
 *           description: 할인 금액
 *         createdAt:
 *           type: string
 *           format: Timestamp
 *           description: 생성일
 *       required:
 *         - id
 *         - delivery
 *         - orderId
 *         - paymentStatus
 *         - discountPrice
 *         - createdAt
 *     PurchaseList:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/Purchase'
 */

@Entity('purchase')
export class Purchase {
    @PrimaryGeneratedColumn('increment')
    id!: number

    @CreateDateColumn()
    createdAt!: Date | Timestamp

    @ManyToOne(() => Delivery, {eager: true, onDelete: 'CASCADE'})
    @JoinColumn()
    delivery?: Delivery

    @ManyToOne(() => User, user => user)
    user?: User

    @OneToMany(() => SelectedProduct, selectedProduct => selectedProduct.id)
    selectedProducts?: SelectedProduct[];

    @Column({ type: 'varchar', length: 30, unique: true })
    orderId?: string;

    @Column({type: 'int', nullable: true })
    amount?: number;

    @Column( { type: 'int', nullable: true })
    discount?: number;

    @Column({ type: 'varchar', length: 30, unique: true })
    paymentKey?: string;
    
    @Column({ type: 'tinyint' })
    paymentStatus: number = 0;
    
    @Column({ type: 'varchar', length: 20 })
    deliveryCompany?: string = '';
    
    @Column({ type: 'varchar', length: 20 })
    trackingNumber?: string = '';
    
}