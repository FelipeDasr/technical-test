import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  OneToMany,
  Index,
} from 'typeorm';

import { ProductEntity } from './product.entity';

import { ICategory } from 'src/app/dtos/entities/category.dto';

@Entity('categories')
export class CategoryEntity implements ICategory {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @Index()
  name: string;

  @Column({ nullable: true })
  description: string | null;

  @DeleteDateColumn()
  deleted_at: Date | null;

  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity;
}
