import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity('member')
export class MemberEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({name: 'firstname', type: 'varchar'})
  firstName!: string

  @Column({name: 'lastname', type: 'varchar'})
  lastName!: string

  @Column({name: 'email', unique: true, type: 'varchar'})
  email!: string

  @Column({name: 'age', type: 'int'})
  age!: number

  @Column({ name: 'createdate', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate!: Date

  @Column({ name: 'updatedate', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: "CURRENT_TIMESTAMP" })
  updateDate!: Date
}
