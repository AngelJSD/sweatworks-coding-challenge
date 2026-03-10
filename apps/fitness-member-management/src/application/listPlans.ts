import { Plan } from "../domain/models/plan.model";
import { PlanRepositoryInterface } from "../domain/repositories/plan.repository.interface";

export class ListPlans {
  constructor(private readonly planRepository: PlanRepositoryInterface) {}

  async execute(): Promise<Array<Plan>> {
    const plans = await this.planRepository.getAll();

    return plans;
  }
}
