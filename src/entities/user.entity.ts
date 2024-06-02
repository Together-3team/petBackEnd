import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm"
import { Delivery, Wishlist } from "../entities"

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 고유 ID
 *         delivery:
 *           type: delivery[]
 *           description: 배송지
 *         email:
 *           type: string
 *           description: 이메일
 *         nickname:
 *           type: string
 *           description: 닉네임
 *         phoneNumber:
 *           type: string
 *           description: 연락처
 *         profileImage:
 *           type: string
 *           nullable: true
 *           description: 프로필 이미지
 *         snsId:
 *           type: string
 *           description: 소셜 ID
 *         provider:
 *           type: string
 *           description: 플랫폼
 *         createdAt:
 *           type: string
 *           format: Timestamp
 *           description: 생성일
 *       required:
 *         - id
 *         - email
 *         - nickname
 *         - phoneNumber
 *         - snsId
 *         - provider
 *         - createdAt
 */

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('increment')
    id!: number

    @Column('varchar', {length: 30})
    email: string

    @Column('varchar', {length: 30})
    nickname: string

    @Column('varchar', {length: 20})
    phoneNumber: string

    @Column('text', {nullable: true})
    profileImage?: string

    @Column('varchar', {length: 30})
    snsId: string = 'local'

    @Column('varchar', {length: 10})
    provider: string = 'local'

    @Column('boolean')
    isSubscribedToPromotions: boolean = false

    @CreateDateColumn()
    createdAt!: Timestamp

    @OneToMany(() => Delivery, (delivery) => delivery.user, {nullable: true})
    deliveries?: Delivery[];

    @OneToMany(() => Wishlist, (wishlist) => wishlist.user, {nullable: true})
    wishlists?: Wishlist[];
    
    constructor(email: string, nickname: string, phoneNumber: string) {
        this.email = email
        this.nickname = nickname
        this.phoneNumber = phoneNumber
    }
}