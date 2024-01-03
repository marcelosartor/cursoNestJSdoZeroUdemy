import { MigrationInterface, QueryRunner } from 'typeorm'

export class M001CreateTableCourses1695387948806 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS courses (
            id  bigserial not null,
            name varchar(100) not null,
            description varchar(100),
            tags json NOT NULL,
            primary key (id)
        );
        `)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE IF EXISTS courses ;`)
	}
}
