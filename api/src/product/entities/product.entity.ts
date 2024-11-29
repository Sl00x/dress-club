import { ApiProperty } from '@nestjs/swagger';
import { Brand } from 'src/brand/entities/brand.entity';
import { Category } from 'src/category/entities/category.entity';
import { Gender } from 'src/gender/entities/gender.entity';
import { Price } from 'src/price/entities/price.entity';
import { ProductMedia } from 'src/product-media/entities/product-media.entity';
import { SubCategory } from 'src/sub-category/entities/sub-category.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ProductState {
  FAIR = 'FAIR',
  GOOD = 'GOOD',
  NEVER_WORN = 'NEVER_WORN',
  NEVER_WORN_TAG = 'NEVER_WORN_TAG',
}

@Entity()
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  model: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty()
  @Column({ default: false })
  vintage: boolean;

  @ApiProperty()
  @Column({ default: false })
  blockchain: boolean;

  @Column({ default: false })
  hasAuthenticityPapers: boolean;

  @ApiProperty()
  @Column({ default: false })
  selled: boolean;

  @ApiProperty()
  @ManyToMany(() => User)
  @JoinTable({ name: 'product_like' })
  likes: User[];

  @ApiProperty()
  @Column()
  state: ProductState;

  @ManyToOne(() => Brand)
  @JoinColumn({ name: 'brandId' })
  brand: Brand;

  @Column()
  brandId: string;

  @OneToMany(() => Price, (price) => price.product)
  prices: Price[];

  @OneToMany(() => ProductMedia, (pMedia) => pMedia.product)
  medias: ProductMedia[];

  @ManyToOne(() => SubCategory)
  @JoinColumn({ name: 'subCategoryId' })
  subCategory: SubCategory;

  @Column({ nullable: true })
  subCategoryId: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column({ nullable: true })
  categoryId: string;

  @ManyToOne(() => Gender)
  @JoinColumn({ name: 'genderId' })
  gender: Gender;

  @Column()
  genderId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  userId: string;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deleted_at: Date;
}
