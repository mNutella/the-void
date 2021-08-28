import {MigrationInterface, QueryRunner} from "typeorm";

export class renamedAdjacentTableEpisodeTag1630072027356 implements MigrationInterface {
    name = 'renamedAdjacentTableEpisodeTag1630072027356'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL DEFAULT 'System', "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300), "internalComment" character varying(300), "name" character varying(60) NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "episode" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL DEFAULT 'System', "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300), "internalComment" character varying(300), "title" character varying(300) NOT NULL, "desc" character varying(500) NOT NULL, "sourceUrl" character varying(2083) NOT NULL, "crimeDateTime" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_7258b95d6d2bf7f621845a0e143" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "episode_profile" ("episode" uuid NOT NULL, "profile" uuid NOT NULL, CONSTRAINT "PK_eed56ee5a472b6f4651b82e8bcb" PRIMARY KEY ("episode", "profile"))`);
        await queryRunner.query(`CREATE INDEX "IDX_63e6bf7a9a4b3f3e738766266b" ON "episode_profile" ("episode") `);
        await queryRunner.query(`CREATE INDEX "IDX_74f06723b01bc1b1eaab9b92e2" ON "episode_profile" ("profile") `);
        await queryRunner.query(`CREATE TABLE "episode_tag" ("episode" uuid NOT NULL, "tag" uuid NOT NULL, CONSTRAINT "PK_5fa1839764f8d9a4f8bca9581f6" PRIMARY KEY ("episode", "tag"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c462ad77c79ab4879d59dbe06b" ON "episode_tag" ("episode") `);
        await queryRunner.query(`CREATE INDEX "IDX_7d52eed4320b738ace8983652b" ON "episode_tag" ("tag") `);
        await queryRunner.query(`ALTER TABLE "episode_profile" ADD CONSTRAINT "FK_63e6bf7a9a4b3f3e738766266b3" FOREIGN KEY ("episode") REFERENCES "episode"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "episode_profile" ADD CONSTRAINT "FK_74f06723b01bc1b1eaab9b92e28" FOREIGN KEY ("profile") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "episode_tag" ADD CONSTRAINT "FK_c462ad77c79ab4879d59dbe06b4" FOREIGN KEY ("episode") REFERENCES "episode"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "episode_tag" ADD CONSTRAINT "FK_7d52eed4320b738ace8983652b3" FOREIGN KEY ("tag") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "episode_tag" DROP CONSTRAINT "FK_7d52eed4320b738ace8983652b3"`);
        await queryRunner.query(`ALTER TABLE "episode_tag" DROP CONSTRAINT "FK_c462ad77c79ab4879d59dbe06b4"`);
        await queryRunner.query(`ALTER TABLE "episode_profile" DROP CONSTRAINT "FK_74f06723b01bc1b1eaab9b92e28"`);
        await queryRunner.query(`ALTER TABLE "episode_profile" DROP CONSTRAINT "FK_63e6bf7a9a4b3f3e738766266b3"`);
        await queryRunner.query(`DROP INDEX "IDX_7d52eed4320b738ace8983652b"`);
        await queryRunner.query(`DROP INDEX "IDX_c462ad77c79ab4879d59dbe06b"`);
        await queryRunner.query(`DROP TABLE "episode_tag"`);
        await queryRunner.query(`DROP INDEX "IDX_74f06723b01bc1b1eaab9b92e2"`);
        await queryRunner.query(`DROP INDEX "IDX_63e6bf7a9a4b3f3e738766266b"`);
        await queryRunner.query(`DROP TABLE "episode_profile"`);
        await queryRunner.query(`DROP TABLE "episode"`);
        await queryRunner.query(`DROP TABLE "tags"`);
    }

}
