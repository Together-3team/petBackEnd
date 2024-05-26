import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm"

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('increment')
    id?: number

    @Column('varchar', {length: 30})
    email: string

    @Column('varchar', {length: 30})
    name: string

    // @Column('varchar', {length: 30})
    // password?: string

    // @Column('varchar', {length: 30})
    // phoneNumber: string

    // @Column('text')
    // profileImage?: string

    // @CreateDateColumn()
    // createdAt?: Timestamp

    constructor(email: string, name: string) {
        this.email = email
        this.name = name
        // this.phoneNumber = phoneNumber
    }
}