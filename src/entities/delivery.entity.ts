import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm"
import { User } from "../entities"

/**
 * @swagger
 * components:
 *   schemas:
 *     Delivery:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 고유 ID
 *         user:
 *           type: User
 *           description: 사용자
 *         name:
 *           type: string
 *           description: 배송지명
 *         recipient:
 *           type: string
 *           description: 수령인
 *         recipientPhoneNumber:
 *           type: string
 *           description: 수령인 연락처
 *         zipCode:
 *           type: string
 *           description: 우편번호
 *         address:
 *           type: string
 *           description: 주소지
 *         detailedAddress:
 *           type: string
 *           description: 상세 주소
 *         isDefault:
 *           type: boolean
 *           description: 기본 배송지 여부
 *         createdAt:
 *           type: string
 *           format: Timestamp
 *           description: 생성일
 *       required:
 *         - id
 *         - userId
 *         - name
 *         - recipient
 *         - recipientPhoneNumber
 *         - zipCode
 *         - address
 *         - detailedAddress
 *         - isDefault
 *         - createdAt
 *     DeliveryList:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/Delivery'
 */

@Entity('delivery')
export class Delivery {
    @PrimaryGeneratedColumn('increment')
    id!: number

    @Column('varchar', {length: 30})
    name: string

    @Column('varchar', {length: 30})
    recipient: string

    @Column('varchar', {length: 20})
    recipientPhoneNumber: string

    @Column('varchar', { length: 10})
    zipCode: string

    @Column('varchar', {length: 30})
    address: string

    @Column('varchar', {length: 30})
    detailedAddress: string

    @Column('boolean')
    isDefault: boolean = false

    @CreateDateColumn()
    createdAt!: Timestamp

    @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn()
    user: User

    constructor(name: string, recipient: string, recipientPhoneNumber: string, zipCode: string, address: string, detailedAddress: string, user: User) {
        this.name = name
        this.recipient = recipient
        this.recipientPhoneNumber = recipientPhoneNumber
        this.zipCode = zipCode
        this.address = address
        this.detailedAddress = detailedAddress
        this.user = user
    }
}