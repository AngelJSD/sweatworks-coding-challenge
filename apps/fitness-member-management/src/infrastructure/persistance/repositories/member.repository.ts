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
      findOneBy: async (where: any) => {
        const keys = Object.keys(where);
        return initialData.find(entity => {
          return keys.every(key => (entity as any)[key] === where[key]);
        }) || null;
      },
      find: async () => [...initialData],
      create: (data: any) => ({ ...data, id: crypto.randomUUID() } as MemberEntity),
      save: async (entity: MemberEntity) => {
        const now = new Date();
        entity.createDate = now;
        entity.updateDate = now;

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

  async findByEmail(email: string): Promise<Member | undefined> {
    const entity = await this.repository.findOneBy({ email });
    
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