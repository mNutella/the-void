import {MigrationInterface, QueryRunner} from "typeorm";

export class addedEpisodes1629854249353 implements MigrationInterface {
    name = 'addedEpisodes1629854249353'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "episode" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300) NOT NULL, "internalComment" character varying(300), "title" character varying(300) NOT NULL, "desc" character varying(500) NOT NULL, "sourceUrl" character varying(2083) NOT NULL, "crimeDateTime" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_7258b95d6d2bf7f621845a0e143" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "episode_accomplices_profile" ("episode" uuid NOT NULL, "profile" uuid NOT NULL, CONSTRAINT "PK_3a3e57b48f6ccfa2bb1306424da" PRIMARY KEY ("episode", "profile"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d93420c5fe0424243a4c1845ad" ON "episode_accomplices_profile" ("episode") `);
        await queryRunner.query(`CREATE INDEX "IDX_dc339898b816079d6a2ef65974" ON "episode_accomplices_profile" ("profile") `);
        await queryRunner.query(`ALTER TABLE "episode_accomplices_profile" ADD CONSTRAINT "FK_d93420c5fe0424243a4c1845ad4" FOREIGN KEY ("episode") REFERENCES "episode"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "episode_accomplices_profile" ADD CONSTRAINT "FK_dc339898b816079d6a2ef65974c" FOREIGN KEY ("profile") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "episode_accomplices_profile" DROP CONSTRAINT "FK_dc339898b816079d6a2ef65974c"`);
        await queryRunner.query(`ALTER TABLE "episode_accomplices_profile" DROP CONSTRAINT "FK_d93420c5fe0424243a4c1845ad4"`);
        await queryRunner.query(`DROP INDEX "IDX_dc339898b816079d6a2ef65974"`);
        await queryRunner.query(`DROP INDEX "IDX_d93420c5fe0424243a4c1845ad"`);
        await queryRunner.query(`DROP TABLE "episode_accomplices_profile"`);
        await queryRunner.query(`DROP TABLE "episode"`);
    }

}
