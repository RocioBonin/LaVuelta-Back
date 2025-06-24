import { MigrationInterface, QueryRunner } from "typeorm";

export class AddShipmentStatusEnumValues1698101234567 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TYPE shipment_status_enum ADD VALUE IF NOT EXISTS 'EMPAQUETADO';
    `);
    await queryRunner.query(`
      ALTER TYPE shipment_status_enum ADD VALUE IF NOT EXISTS 'DESPACHADO';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // No se puede eliminar valores de ENUM en PostgreSQL
  }
}
