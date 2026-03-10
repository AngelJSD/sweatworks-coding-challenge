import { Repository, DataSource } from "typeorm";
import { CreateMembershipInput, Membership } from "../../../domain/models/membership.model";
import { MembershipEntity } from "../entities/membership.entity";
import { MembershipRepositoryInterface } from "../../../domain/repositories/membership.repository.interface";
import { MembershipMapper } from "../mappers/membership.mapper";

export class MembershipRepository implements MembershipRepositoryInterface {
  private repository: Repository<MembershipEntity>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(MembershipEntity);
  }

  async findAllByMemberId(memberId: string): Promise<Array<Membership> | undefined> {
    const entities = await this.repository.findBy({ memberId });

    return entities.map((entity) => MembershipMapper.toDomain(entity));
  }

  async save(membership: CreateMembershipInput): Promise<Membership> {
    const entity = this.repository.create(membership);
    const savedEntity = await this.repository.save(entity);
    
    return MembershipMapper.toDomain(savedEntity);
  }
}