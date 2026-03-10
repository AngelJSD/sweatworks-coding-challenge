import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn, 
  ManyToOne, 
  JoinColumn,
} from 'typeorm';
import { MemberEntity } from './member.entity';
import { PlanEntity } from './plan.entity';

@Entity('membership')
export class MembershipEntity {
  
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'memberid', type: 'uuid' })
  memberId!: string;

  @Column({ name: 'planid', type: 'uuid' })
  planId!: string;

  @ManyToOne(() => MemberEntity, (member) => member.memberships)
  @JoinColumn({ name: 'memberid' })
  member!: MemberEntity;

  @ManyToOne(() => PlanEntity, (plan) => plan.memberships)
  @JoinColumn({ name: 'planId' })
  plan!: PlanEntity;

  @Column({ name: 'startdate', type: 'timestamp' })
  startDate!: Date;

  @Column({ name: 'enddate', type: 'timestamp' })
  endDate!: Date;

  @Column({ name: 'canceldate', type: 'timestamp', nullable: true, default: null })
  cancelDate!: Date | null;

  @UpdateDateColumn({ name: 'updatedate', type: 'timestamp' })
  updateDate!: Date;

  @CreateDateColumn({name: 'createdate', type: 'timestamp' })
  createDate!: Date;
}