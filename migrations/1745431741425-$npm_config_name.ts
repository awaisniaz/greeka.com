import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1745431741425 implements MigrationInterface {
    name = ' $npmConfigName1745431741425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."task_status_enum" AS ENUM('Pending', 'Done', 'In Progress', 'Paused')`);
        await queryRunner.query(`CREATE TYPE "public"."task_priority_enum" AS ENUM('High', 'Medium', 'Low')`);
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "dueDate" date NOT NULL, "status" "public"."task_status_enum" NOT NULL, "priority" "public"."task_priority_enum" NOT NULL, "dateOfCreation" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TYPE "public"."task_priority_enum"`);
        await queryRunner.query(`DROP TYPE "public"."task_status_enum"`);
    }

}
