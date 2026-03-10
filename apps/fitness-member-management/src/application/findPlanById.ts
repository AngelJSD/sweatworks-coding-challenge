import { Plan } from "../domain/models/plan.model";
import { PlanRepositoryInterface } from "../domain/repositories/plan.repository.interface";

export class FindPlanById {
  constructor(private readonly planRepository: PlanRepositoryInterface) {}

  async execute(id: string): Promise<Plan | undefined> {
    const plan = await this.planRepository.findById(id);

    return plan;
  }
}
