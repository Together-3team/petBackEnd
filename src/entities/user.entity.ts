import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm"

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('increment')
    id!: number

    @Column('varchar', {length: 30})
    email: string

    @Column('varchar', {length: 30})
    nickname: string

    @Column('varchar', {length: 30})
    password!: string

    @Column('varchar', {length: 30})
    phoneNumber: string

    @Column('text')
    profileImage: string = ''

    @CreateDateColumn()
    createdAt!: Timestamp

    @Column('varchar', {length: 20})
    snsId: string = 'local'

    @Column('varchar', {length: 10})
    provider: string = 'local'

    constructor(email: string, nickname: string, phoneNumber: string) {
        this.email = email
        this.nickname = nickname
        this.phoneNumber = phoneNumber
    }
}