import {MigrationInterface, QueryRunner} from "typeorm";

export class addedTags1629996250390 implements MigrationInterface {
    name = 'addedTags1629996250390'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300) NOT NULL, "internalComment" character varying(300), "name" character varying(60) NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "episode_tag" ("episode" uuid NOT NULL, "tag" uuid NOT NULL, CONSTRAINT "PK_5fa1839764f8d9a4f8bca9581f6" PRIMARY KEY ("episode", "tag"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c462ad77c79ab4879d59dbe06b" ON "episode_tag" ("episode") `);
        await queryRunner.query(`CREATE INDEX "IDX_7d52eed4320b738ace8983652b" ON "episode_tag" ("tag") `);
        await queryRunner.query(`ALTER TABLE "episode_tag" ADD CONSTRAINT "FK_c462ad77c79ab4879d59dbe06b4" FOREIGN KEY ("episode") REFERENCES "episode"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "episode_tag" ADD CONSTRAINT "FK_7d52eed4320b738ace8983652b3" FOREIGN KEY ("tag") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "episode_tag" DROP CONSTRAINT "FK_7d52eed4320b738ace8983652b3"`);
        await queryRunner.query(`ALTER TABLE "episode_tag" DROP CONSTRAINT "FK_c462ad77c79ab4879d59dbe06b4"`);
        await queryRunner.query(`DROP INDEX "IDX_7d52eed4320b738ace8983652b"`);
        await queryRunner.query(`DROP INDEX "IDX_c462ad77c79ab4879d59dbe06b"`);
        await queryRunner.query(`DROP TABLE "episode_tag"`);
        await queryRunner.query(`DROP TABLE "tags"`);
    }

}
