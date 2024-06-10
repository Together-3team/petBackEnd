import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp } from 'typeorm'
import { SelectedProduct } from './selected.product.entity'


@Entity('group_buying')
export class GroupBuying {
    @PrimaryGeneratedColumn('increment')
    id!: number

    @OneToMany(type => SelectedProduct, (selectedProduct) => selectedProduct.groupBuying)
    selectedProducts: SelectedProduct[] | undefined;

    @Column({ type: 'tinyint' })
    status?: number

    @CreateDateColumn()
    createdAt!: Timestamp

    @CreateDateColumn()
    updatedAt!: Timestamp
}