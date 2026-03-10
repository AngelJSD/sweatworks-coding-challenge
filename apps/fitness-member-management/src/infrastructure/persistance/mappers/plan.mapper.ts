import { Plan as PlanModel, PlanSchema } from "../../../domain/models/plan.model";
import { PlanEntity } from "../entities/plan.entity";

export class PlanMapper {
  static toDomain(dbPlan: PlanEntity): PlanModel {
    return PlanSchema.parse({
      id: dbPlan.id,
      name: dbPlan.name,
      description: dbPlan.description,
      createDate: dbPlan.createDate,
      updateDate: dbPlan.updateDate,
    });
  }

  static toPersistence(planModel: PlanModel): PlanEntity {
    const entity = new PlanEntity();
    entity.id = planModel.id;
    entity.name = planModel.name;
    entity.description = planModel.description;

    return entity;
  }
}