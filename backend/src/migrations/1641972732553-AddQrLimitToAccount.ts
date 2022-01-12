import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddQrLimitToAccount1641972732553 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("account", new TableColumn({
            name: "codeNumberLimit",
            type: "int",
            default: 100
        }));
        await queryRunner.addColumn("account", new TableColumn({
            name: "codeNumberWarning",
            type: "int",
            default: 98
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("account", "codeNumberLimit");
        await queryRunner.dropColumn("account", "codeNumberWarning");
    }
}
