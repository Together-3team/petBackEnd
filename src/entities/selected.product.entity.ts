import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm"
import { OptionCombination, Purchase, User } from "../entities"

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
 *           type: User
 *           description: 사용자
 *         optionCombination:
 *           type: OptionCombination
 *           description: 옵션 조합
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

@Entity('select product')
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

    @ManyToOne(() => Purchase, {eager: true})
    @JoinColumn({name: 'orderId', referencedColumnName: 'orderId'})
    purchase?: Purchase

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