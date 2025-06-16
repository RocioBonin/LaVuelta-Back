import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1750051786375 implements MigrationInterface {
  name = "InitSchema1750051786375";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "public"."shipment_status_enum" AS ENUM('POR EMPAQUETAR', 'EN CAMINO', 'ENTREGADO')
    `);
    await queryRunner.query(`
      CREATE TYPE "public"."shipment_shipmenttype_enum" AS ENUM('CLIENTE', 'EMPRESA')
    `);
    await queryRunner.query(`
      CREATE TYPE "public"."users_role_enum" AS ENUM('CLIENTE', 'ADMIN')
    `);

    await queryRunner.query(`
      CREATE TABLE "deposit" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "product" character varying(100) NOT NULL,
        "quantity" integer NOT NULL,
        "company" character varying(100) NOT NULL,
        "customerId" uuid NOT NULL,
        CONSTRAINT "PK_6654b4be449dadfd9d03a324b61" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "shipment_product" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "quantity" integer NOT NULL,
        "shipmentId" uuid NOT NULL,
        "productId" uuid NOT NULL,
        CONSTRAINT "PK_6c882bbe853471765f6e4ef4caf" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "shipment" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "orderId" character varying NOT NULL,
        "address" character varying NOT NULL,
        "locality" character varying NOT NULL,
        "postalCode" character varying NOT NULL,
        "province" character varying NOT NULL,
        "company" character varying NOT NULL,
        "price" integer,
        "deliveryDate" TIMESTAMP,
        "status" "public"."shipment_status_enum" NOT NULL DEFAULT 'POR EMPAQUETAR',
        "shipmentType" "public"."shipment_shipmenttype_enum" NOT NULL,
        "customerId" uuid NOT NULL,
        CONSTRAINT "PK_f51f635db95c534ca206bf7a0a4" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "fullName" character varying(50) NOT NULL,
        "email" character varying NOT NULL,
        "dni" character varying NOT NULL,
        "password" character varying NOT NULL,
        "address" character varying NOT NULL,
        "phone" character varying NOT NULL,
        "birthdate" TIMESTAMP NOT NULL,
        "company" character varying NOT NULL,
        "role" "public"."users_role_enum" NOT NULL DEFAULT 'CLIENTE',
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "newsletter" boolean NOT NULL DEFAULT false,
        CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
        CONSTRAINT "UQ_5fe9cfa518b76c96518a206b350" UNIQUE ("dni"),
        CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"),
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "subscribers" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "email" character varying NOT NULL,
        "subscribedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_1a7163c08f0e57bd1c9821508b1" UNIQUE ("email"),
        CONSTRAINT "PK_cbe0a7a9256c826f403c0236b67" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "payment" (
        "id" SERIAL NOT NULL,
        "paymentId" character varying NOT NULL,
        "status" character varying NOT NULL,
        CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "deposit"
      ADD CONSTRAINT "FK_2c0d2e26cb12bb3acc9d2659cbe"
      FOREIGN KEY ("customerId") REFERENCES "users"("id") ON DELETE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "shipment_product"
      ADD CONSTRAINT "FK_07b029a61d60c10a2d120c6d5ce"
      FOREIGN KEY ("shipmentId") REFERENCES "shipment"("id") ON DELETE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "shipment_product"
      ADD CONSTRAINT "FK_9dc6b914d042a068143ff13f190"
      FOREIGN KEY ("productId") REFERENCES "deposit"("id")
    `);

    await queryRunner.query(`
      ALTER TABLE "shipment"
      ADD CONSTRAINT "FK_232eefbf4d75cd36d4ced04e0c7"
      FOREIGN KEY ("customerId") REFERENCES "users"("id") ON DELETE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "shipment" DROP CONSTRAINT "FK_232eefbf4d75cd36d4ced04e0c7"`);
    await queryRunner.query(`ALTER TABLE "shipment_product" DROP CONSTRAINT "FK_9dc6b914d042a068143ff13f190"`);
    await queryRunner.query(`ALTER TABLE "shipment_product" DROP CONSTRAINT "FK_07b029a61d60c10a2d120c6d5ce"`);
    await queryRunner.query(`ALTER TABLE "deposit" DROP CONSTRAINT "FK_2c0d2e26cb12bb3acc9d2659cbe"`);

    await queryRunner.query(`DROP TABLE "payment"`);
    await queryRunner.query(`DROP TABLE "subscribers"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "shipment"`);
    await queryRunner.query(`DROP TABLE "shipment_product"`);
    await queryRunner.query(`DROP TABLE "deposit"`);

    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TYPE "public"."shipment_shipmenttype_enum"`);
    await queryRunner.query(`DROP TYPE "public"."shipment_status_enum"`);
  }
}
