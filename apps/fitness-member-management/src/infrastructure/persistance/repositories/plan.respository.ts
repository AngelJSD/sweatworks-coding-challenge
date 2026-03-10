import { Repository, DataSource } from "typeorm";
import { PlanRepositoryInterface } from "../../../domain/repositories/plan.repository.interface";
import { Plan } from "../../../domain/models/plan.model";
import { PlanMapper } from "../mappers/plan.mapper";
import { PlanEntity } from "../entities/plan.entity";

export class PlanRepository implements PlanRepositoryInterface {
  private repository: Repository<PlanEntity>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(PlanEntity);
  }

  async findById(id: string): Promise<Plan | undefined> {
    const entity = await this.repository.findOneBy({ id });
    
    if (!entity) return undefined;

    return PlanMapper.toDomain(entity);
  }

  async getAll(): Promise<Array<Plan>> {
    const planEntities = await this.repository.find();

    return planEntities.map(planEntity => PlanMapper.toDomain(planEntity))
  }
}