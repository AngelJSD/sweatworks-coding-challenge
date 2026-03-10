import { DataSource } from "typeorm";
import { MemberEntity } from "./infrastructure/persistance/entities/member.entity";
import { MembershipEntity } from "./infrastructure/persistance/entities/membership.entity";
import { PlanEntity } from "./infrastructure/persistance/entities/plan.entity";

export const dataSource = new DataSource({
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
});

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
