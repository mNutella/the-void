import {MigrationInterface, QueryRunner} from "typeorm";

export class addedEpisodes1629826881958 implements MigrationInterface {
    name = 'addedEpisodes1629826881958'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "episode" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300) NOT NULL, "internalComment" character varying(300), "title" character varying(300) NOT NULL, "desc" character varying(500) NOT NULL, "sourceUrl" character varying(2083) NOT NULL, "crimeDateTime" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_7258b95d6d2bf7f621845a0e143" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "episode"`);
    }

}
