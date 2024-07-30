import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"

@Entity("customer")
export class Customer extends BaseEntity{
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({length :255,nullable: false})
    name: string

    @Column({ unique: true})
    mobilePhone: number

    @Column({nullable: false})
    balance: number
    
}
