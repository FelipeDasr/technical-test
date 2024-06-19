import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateIndices1718810957316 implements MigrationInterface {
  name = 'CreateIndices1718810957316';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "IDX_0778bf878367f94fc75031dcec" ON "product_carts" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_49fc6917e4ee02fc5c3b878822" ON "product_carts" ("product_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8b0be371d28245da6e4f4b6187" ON "categories" ("name") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0806c755e0aca124e67c0cf6d7" ON "products" ("id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4c9fb58de893725258746385e1" ON "products" ("name") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4c9fb58de893725258746385e1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0806c755e0aca124e67c0cf6d7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8b0be371d28245da6e4f4b6187"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_49fc6917e4ee02fc5c3b878822"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0778bf878367f94fc75031dcec"`,
    );
  }
}
