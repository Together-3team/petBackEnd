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
    createdAt!: Timestamp

    @ManyToOne(() => Delivery, {eager: true, onDelete: 'CASCADE'})
    @JoinColumn()
    delivery: Delivery

    @OneToMany(() => SelectedProduct, selectedProduct => selectedProduct.id)
    selectedProducts: SelectedProduct[];

    @Column({ type: 'varchar', length: 30, unique: true })
    orderId: string;
    
    @Column({ type: 'tinyint' })
    paymentStatus: number = 0;
    
    @Column({ type: 'varchar', length: 20 })
    deliveryCompany?: string;
    
    @Column({ type: 'varchar', length: 20 })
    trackingNumber?: string;
    
    @Column({ type: 'int' })
    discountPrice: number;
    
    constructor(delivery: Delivery, orderId: string, discountPrice: number, selectedProducts: SelectedProduct[]) {
        this.delivery = delivery
        this.orderId = orderId
        this.discountPrice = discountPrice
        this.selectedProducts = selectedProducts
    }
}