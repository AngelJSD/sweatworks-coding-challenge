import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePlanAndMembership1773163180853 implements MigrationInterface {
    name = 'CreatePlanAndMembership1773163180853'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "plan" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "updatedate" TIMESTAMP NOT NULL DEFAULT now(), "createdate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_54a2b686aed3b637654bf7ddbb3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "membership" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "memberid" uuid NOT NULL, "planid" uuid NOT NULL, "startdate" TIMESTAMP NOT NULL, "enddate" TIMESTAMP NOT NULL, "canceldate" TIMESTAMP, "updatedate" TIMESTAMP NOT NULL DEFAULT now(), "createdate" TIMESTAMP NOT NULL DEFAULT now(), "planId" uuid, CONSTRAINT "PK_83c1afebef3059472e7c37e8de8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "member" ALTER COLUMN "age" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "membership" ADD CONSTRAINT "FK_d93087d3f5c2c68a4c4829deabd" FOREIGN KEY ("memberid") REFERENCES "member"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "membership" ADD CONSTRAINT "FK_e475cfe9bc4cedda21faa674b27" FOREIGN KEY ("planId") REFERENCES "plan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "membership" DROP CONSTRAINT "FK_e475cfe9bc4cedda21faa674b27"`);
        await queryRunner.query(`ALTER TABLE "membership" DROP CONSTRAINT "FK_d93087d3f5c2c68a4c4829deabd"`);
        await queryRunner.query(`ALTER TABLE "member" ALTER COLUMN "age" SET DEFAULT '0'`);
        await queryRunner.query(`DROP TABLE "membership"`);
        await queryRunner.query(`DROP TABLE "plan"`);
    }

}
