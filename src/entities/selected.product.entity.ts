import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm"
import { OptionCombination, Purchase, User } from "../entities"
import { GroupBuying } from './group.buying.entity'

/**
 * @swagger
 * components:
 *   schemas:
 *     SelectedProduct:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 고유 ID
 *         user:
 *           $ref: '#/components/schemas/User'
 *         optionCombination:
 *           $ref: '#/components/schemas/OptionCombination'
 *         quantity:
 *           type: integer
 *           description: 수량
 *         status:
 *           type: integer
 *           description: 상태
 *         createdAt:
 *           type: string
 *           format: Timestamp
 *           description: 생성일
 *       required:
 *         - id
 *         - optionCombination
 *         - quantity
 *         - status
 *         - createdAt
 *     SelectedProductList:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/SelectedProduct'
 */

@Entity('select_product')
export class SelectedProduct {
    @PrimaryGeneratedColumn('increment')
    id!: number

    @Column('int')
    quantity: number

    @Column('tinyint')
    status: number

    @CreateDateColumn()
    createdAt!: Timestamp

    @ManyToOne(() => User, {eager: true})
    @JoinColumn()
    user: User

    @ManyToOne(() => OptionCombination, {eager: true})
    @JoinColumn()
    optionCombination: OptionCombination

    constructor(quantity: number, status: number, user: User, optionCombination: OptionCombination) {
        this.quantity = quantity
        this.status = status
        this.user = user
        this.optionCombination = optionCombination
    }
}