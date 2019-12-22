import {MigrationInterface, QueryRunner} from "typeorm";

export class myInit1576933633594 implements MigrationInterface {
    name = 'myInit1576933633594'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying(300) NOT NULL, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "lastChangedBy" character varying(300) NOT NULL, "internalComment" character varying(300), "name" character varying(300) NOT NULL, "city" character varying(300) NOT NULL, "type" integer NOT NULL, "info" character varying(300) NOT NULL, CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "profile"`, undefined);
    }

}
