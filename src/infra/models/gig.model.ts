import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { GigEntity } from '../../domain/entities/gig.entity';
import { Seller } from './seller.model';
import SellerEntity from '../../domain/entities/seller.entity';
import { CategoryEntity } from '../../domain/entities/category.entity';
import { Category } from './category.model';
import { SubCategory } from './subCategory.model';
import { SubCategoryEntity } from '../../domain/entities/subCategory.entity';
import { GigImageEntity } from '../../domain/entities/gig_image.entity';
import { GigImage } from './gig_image.model';
import { BaseModel } from './base.model';
import { ReviewEntity } from 'src/domain/entities/review.entity';
import { Review } from './review.model';

@Entity()
export class Gig extends BaseModel implements GigEntity {
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  price: number;

  @ManyToOne(() => Seller, { onDelete: 'CASCADE' })
  seller: SellerEntity;

  @ManyToOne(() => Category, { onDelete: 'CASCADE' })
  category: CategoryEntity;

  @ManyToOne(() => SubCategory, { onDelete: 'CASCADE' })
  subCategories: SubCategoryEntity;

  @OneToMany(() => Review, (review) => review.gig)
  reviews: ReviewEntity[];

  @OneToMany(() => GigImage, (image) => image.gig)
  images: GigImageEntity[];

  @Column({ type: 'varchar', length: 255 })
  coverImage: string;

  @Column({ type: 'int' })
  deliveryTime: number;

  @Column({ type: 'int', default: 0 })
  sales: number;

  @Column({ type: 'float', default: 0.1 })
  averageRating: number;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;
}
