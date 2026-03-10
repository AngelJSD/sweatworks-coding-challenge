import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MembershipEntity } from "./membership.entity";

@Entity('plan')
export class PlanEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  
  @Column({name: 'name', type: 'varchar'})
  name!: string;

  @Column({name: 'description', type: 'varchar'})
  description!: string;

  @OneToMany(() => MembershipEntity, (membership) => membership.plan)
  memberships!: Array<MembershipEntity>;

  @UpdateDateColumn({ name: 'updatedate', type: 'timestamp' })
  updateDate!: Date;
  
  @CreateDateColumn({name: 'createdate', type: 'timestamp' })
  createDate!: Date;
}