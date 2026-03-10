import { DataSource, DataSourceOptions } from "typeorm";
import { MemberEntity } from "./infrastructure/persistance/entities/member.entity";
import { MembershipEntity } from "./infrastructure/persistance/entities/membership.entity";
import { PlanEntity } from "./infrastructure/persistance/entities/plan.entity";
import { SeederOptions } from "typeorm-extension";

const options: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "dev_user",
  password: "dev_password",
  database: "dev_db",
  logging: false,
  entities: [MemberEntity, MembershipEntity, PlanEntity],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  subscribers: [],
  seeds: ['/seeds/**/*.ts'],
}

export const dataSource = new DataSource(options);

// Helper to initialize the DB
export const initializeDatabase = async () => {
  try {
    await dataSource.initialize();
    console.log("Data Source has been initialized!");
  } catch (err) {
    console.error("Error during Data Source initialization", err);
    process.exit(1);
  }
};
