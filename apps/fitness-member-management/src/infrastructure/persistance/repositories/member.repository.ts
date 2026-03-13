import { Repository, DataSource } from "typeorm";
import { MemberEntity } from "../entities/member.entity";
import { MemberMapper } from "../mappers/member.mapper";
import { CreateMemberInput, Member } from "../../../domain/models/member.model";
import { MemberRepositoryInterface } from "../../../domain/repositories/member.repository.interface";

export class MemberRepository implements MemberRepositoryInterface {
  private repository: Repository<MemberEntity>;

  private constructor(repository: Repository<MemberEntity>) {
    this.repository = repository;
  }

  static create(dataSource: DataSource): MemberRepository {
    return new MemberRepository(dataSource.getRepository(MemberEntity));
  }

  static createNull(initialData: MemberEntity[] = []): MemberRepository {
    const stub = {
      findOneBy: async (where: any) => initialData.find(e => e.id === where.id) || null,
      find: async () => [...initialData],
      create: (data: any) => ({ ...data, id: crypto.randomUUID() } as MemberEntity),
      save: async (entity: MemberEntity) => {
        initialData.push(entity);
        return entity;
      },
    } as unknown as Repository<MemberEntity>;

    return new MemberRepository(stub);
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