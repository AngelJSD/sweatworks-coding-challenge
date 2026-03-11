import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePreventMembershipOverlapTrigger1773195951038 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION check_membership_overlap()
      RETURNS TRIGGER AS $$
      BEGIN
          IF EXISTS (
              SELECT 1 FROM membership
              WHERE "memberid" = NEW."memberid"
                AND "canceldate" IS NULL
                AND "enddate" > CURRENT_TIMESTAMP
                AND id <> NEW.id
          ) THEN
              RAISE EXCEPTION 'Conflict: There is already an active membership.'
              USING ERRCODE = '45000';
          END IF;

          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await queryRunner.query(`
        CREATE OR REPLACE TRIGGER trigger_memberships_overlap_check
        BEFORE INSERT ON membership
        FOR EACH ROW
        EXECUTE FUNCTION check_membership_overlap();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE OR REPLACE FUNCTION check_membership_overlap()
        RETURNS TRIGGER AS $$
        BEGIN
            IF EXISTS (
                SELECT 1 FROM membership
                WHERE "memberId" = NEW."memberId"
                  AND "cancelDate" IS NULL
                  AND "endDate" > CURRENT_TIMESTAMP
                  AND id <> NEW.id
            ) THEN
                RAISE EXCEPTION 'Conflicto: El usuario ya tiene una membresía vigente o programada que se solapa.'
                USING ERRCODE = '45000';
            END IF;

            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
    `);

    await queryRunner.query(`
        CREATE TRIGGER trigger_memberships_overlap_check
        BEFORE INSERT OR UPDATE ON membership
        FOR EACH ROW
        EXECUTE FUNCTION check_membership_overlap();
    `);
  }

}
