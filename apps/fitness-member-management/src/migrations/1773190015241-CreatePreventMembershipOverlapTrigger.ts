import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePreventMembershipOverlapTrigger1773190015241 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
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

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TRIGGER IF EXISTS trigger_memberships_overlap_check ON membership;`);
    await queryRunner.query(`DROP FUNCTION IF EXISTS check_membership_overlap();`);
  }
}
