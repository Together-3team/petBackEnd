import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp } from 'typeorm'
import { SelectedProduct } from './selected.product.entity'
import { PurchaseProduct } from './purchase.product.entity'


@Entity('group_buying')
export class GroupBuying {
    @PrimaryGeneratedColumn('increment')
    id!: number

    @OneToMany(type => PurchaseProduct, (purchaseProduct) => purchaseProduct.groupBuying)
    purchaseProducts?: PurchaseProduct[];

    @Column({ type: 'tinyint' })
    status?: number

    @CreateDateColumn()
    createdAt!: Timestamp

    @CreateDateColumn()
    updatedAt!: Timestamp
}