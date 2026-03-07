import { Repository, DataSource } from "typeorm";
import { MemberEntity } from "../entities/member.entity";
import { MemberMapper } from "../mappers/member.mapper";
import { CreateMemberInput, Member } from "../../../domain/models/memeber.model";
import { MemberRepositoryInterface } from "../../../domain/repositories/member.repository.interface";

export class MemberRepository implements MemberRepositoryInterface {
  private repository: Repository<MemberEntity>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(MemberEntity);
  }

  async findById(id: string): Promise<Member | null> {
    const entity = await this.repository.findOneBy({ id });
    
    if (!entity) return null;

    return MemberMapper.toDomain(entity);
  }

  async save(member: CreateMemberInput): Promise<Member> {
    const entity = this.repository.create(member);
    console.log('ENTITY!')
    const savedEntity = await this.repository.save(entity);
    console.log('SAVED!')
    
    return MemberMapper.toDomain(savedEntity);
  }
}