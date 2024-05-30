import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm"
import { User } from "./user.entity"

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
 *         userId:
 *           type: integer
 *           description: 사용자 참조 키
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
 *           type: integer
 *           description: 우편번호
 *         address:
 *           type: string
 *           description: 주소지
 *         detailedAddress:
 *           type: string
 *           description: 상세 주소
 *         instruction:
 *           type: string
 *           nullable: true
 *           description: 요청 사항
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
    id?: number

    @Column('varchar', {length: 30})
    name: string

    @Column('varchar', {length: 30})
    recipient: string

    @Column('varchar', {length: 20})
    recipientPhoneNumber: string

    @Column('int')
    zipCode: number

    @Column('varchar', {length: 30})
    address: string

    @Column('varchar', {length: 30})
    detailedAddress: string

    @Column('varchar', {length: 30, nullable: true})
    instruction?: string

    @Column('boolean')
    isDefault: boolean = false

    @CreateDateColumn()
    createdAt!: Timestamp

    @ManyToOne(() => User, (user) => user.deliveries, {eager: true})
    @JoinColumn()
    user: User

    constructor(name: string, recipient: string, recipientPhoneNumber: string, zipCode: number, address: string, detailedAddress: string, user: User) {
        this.name = name
        this.recipient = recipient
        this.recipientPhoneNumber = recipientPhoneNumber
        this.zipCode = zipCode
        this.address = address
        this.detailedAddress = detailedAddress
        this.user = user
    }
}