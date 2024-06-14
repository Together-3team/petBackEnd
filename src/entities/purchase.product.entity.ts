import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm"
import { User, Delivery, SelectedProduct, GroupBuying, Purchase } from '../entities'


@Entity()
export class PurchaseProduct {
    @PrimaryGeneratedColumn('increment')
    id!: number

    @CreateDateColumn()
    createdAt!: Date | Timestamp

    @ManyToOne(() => User, user => user.purchaseProducts)
    user?: User

    @ManyToOne(() => GroupBuying, groupBuying => groupBuying.purchaseProducts)
    groupBuying?: GroupBuying

    @ManyToOne(() => Purchase, purchase => purchase.purchaseProducts)
    purchase?: Purchase

    @Column({ type: 'varchar', length: 30 })
    title?: string;

    @Column({type: 'tinyint', nullable: false, default: 0 })
    status?: number;

    @Column( { type: 'varchar', length: 100 })
    optionCombinationName?: string;

    @Column({ type: 'int', default: 0 })
    quantity?: number;

    @Column({ type: 'int', default: 0 })
    originalPrice?: number;

    @Column({ type: 'int', default: 0 })
    price?: number;

    @Column({ type: 'int', default: 0 })
    combinationPrice?: number;

    @Column({ type: 'text', nullable: true })
    thumbNailImage?: string = '';

    @Column({ type: 'varchar', length: 20 })
    deliveryCompany?: string;

    @Column({ type: 'varchar', length: 20 })
    trackingNumber?: string;
    
}