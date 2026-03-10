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

  async findById(id: string): Promise<Member | undefined> {
    const entity = await this.repository.findOneBy({ id });
    
    if (!entity) return undefined;

    return MemberMapper.toDomain(entity);
  }

  async save(member: CreateMemberInput): Promise<Member> {
    const entity = this.repository.create(member);
    const savedEntity = await this.repository.save(entity);
    
    return MemberMapper.toDomain(savedEntity);
  }

  async getAll(): Promise<Array<Member>> {
    const memberEntities = await this.repository.find();

    return memberEntities.map(memberEntity => MemberMapper.toDomain(memberEntity))
  }
}