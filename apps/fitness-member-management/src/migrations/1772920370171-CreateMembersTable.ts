import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMembersTable1772920370171 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.query(`
      CREATE TABLE "member" (
          "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "firstname" character varying NOT NULL,
          "lastname" character varying NOT NULL,
          "createdate" TIMESTAMP NOT NULL DEFAULT now(),
          "updatedate" TIMESTAMP NOT NULL DEFAULT now(),
          "email" character varying NOT NULL,
          "age" integer NOT NULL DEFAULT 0,
          CONSTRAINT "PK_users" PRIMARY KEY ("id"),
          CONSTRAINT "UQ_users_email" UNIQUE ("email")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "member"`);
  }

}
