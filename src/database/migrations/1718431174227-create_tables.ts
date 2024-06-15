import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1718431174227 implements MigrationInterface {
  name = 'CreateTables1718431174227';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "deleted_at" TIMESTAMP, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "purchase_items" ("id" SERIAL NOT NULL, "product_id" integer NOT NULL, "unit_price" integer NOT NULL, "user_purchase_id" integer NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "PK_e3d9bea880baad86ff6de3290da" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_purchases" ("id" SERIAL NOT NULL, "total_amount" integer NOT NULL, "user_id" integer NOT NULL, "purchase_date" TIMESTAMP NOT NULL, CONSTRAINT "PK_4415c40c02391c8376dde9ff1b7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "unit_price" integer NOT NULL, "category_id" integer NOT NULL, "owner_id" integer NOT NULL, "deleted_at" TIMESTAMP, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_carts" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "product_id" integer NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "PK_e0ef9ff8f37c235d23a107c841e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_items" ADD CONSTRAINT "FK_8bafbb5d45827a5d25f5cd3c6f3" FOREIGN KEY ("user_purchase_id") REFERENCES "user_purchases"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_items" ADD CONSTRAINT "FK_5b31a541ce1fc1f428db518efa4" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_purchases" ADD CONSTRAINT "FK_89b28b2d0561b98586e9208fb3f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_663aa9983fd61dfc310d407d4da" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_carts" ADD CONSTRAINT "FK_f3c67dec2a04572bb98792123e5" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_carts" ADD CONSTRAINT "FK_a9958dc863e6b8cd6bfd73a838f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_carts" DROP CONSTRAINT "FK_a9958dc863e6b8cd6bfd73a838f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_carts" DROP CONSTRAINT "FK_f3c67dec2a04572bb98792123e5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_663aa9983fd61dfc310d407d4da"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_purchases" DROP CONSTRAINT "FK_89b28b2d0561b98586e9208fb3f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_items" DROP CONSTRAINT "FK_5b31a541ce1fc1f428db518efa4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_items" DROP CONSTRAINT "FK_8bafbb5d45827a5d25f5cd3c6f3"`,
    );
    await queryRunner.query(`DROP TABLE "product_carts"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "user_purchases"`);
    await queryRunner.query(`DROP TABLE "purchase_items"`);
    await queryRunner.query(`DROP TABLE "categories"`);
  }
}
