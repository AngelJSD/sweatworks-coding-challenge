import { Plan } from "../models/plan.model";

export interface PlanRepositoryInterface {
  getAll(): Promise<Array<Plan>>;
  findById(id: string): Promise<Plan | undefined>;
}
