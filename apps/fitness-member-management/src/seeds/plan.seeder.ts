import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { PlanEntity } from "../infrastructure/persistance/entities/plan.entity";

export default class PlanSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
  ): Promise<any> {
    const repository = dataSource.getRepository(PlanEntity);
    await repository.insert([
      { name: 'Basic', description: 'Basic plan' },
      { name: 'Standard', description: 'Standard plan' },
      { name: 'Premium', description: 'Premium plan' },
    ]);
  }
}
