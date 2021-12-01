import {MigrationInterface, QueryRunner} from "typeorm";

export class migrationNameHere1638326821179 implements MigrationInterface {
    name = 'migrationNameHere1638326821179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`something\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`something\``);
    }

}
