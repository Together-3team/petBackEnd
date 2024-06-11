import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm"
import { User, Product } from "../entities"

/**
 * @swagger
 * components:
 *   schemas:
 *     Zzim:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 고유 ID
 *         user:
 *           $ref: '#/components/schemas/User'
 *         product:
 *           $ref: '#/components/schemas/Product'
 *         createdAt:
 *           type: string
 *           format: Timestamp
 *           description: 생성일
 *       required:
 *         - id
 *         - user
 *         - product
 *         - createdAt
 *     ZzimList:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/Zzim'
 */

@Entity('zzim')
export class Zzim {
    @PrimaryGeneratedColumn('increment')
    id!: number

    @CreateDateColumn()
    createdAt!: Timestamp

    @ManyToOne(() => User, {eager: true, onDelete: 'CASCADE'})
    @JoinColumn()
    user: User

    @ManyToOne(() => Product, {eager: true})
    @JoinColumn()
    product: Product

    constructor(user: User, product: Product) {
        this.user = user
        this.product = product
    }
}