import SellerEntity from './seller.entity';
import { CategoryEntity } from './category.entity';
import { SubCategoryEntity } from './subCategory.entity';
import { GigImageEntity } from './gig_image.entity';
import BaseEntity from '../../application/core/base/base_entity';
import { ReviewEntity } from './review.entity';

export class GigEntity extends BaseEntity {
  title?: string;
  description?: string;
  price?: number;
  seller?: SellerEntity; // Many to one
  category?: CategoryEntity; // Many to one
  subCategories?: SubCategoryEntity; // Many to one
  reviews?: ReviewEntity[]; // One to many
  images?: GigImageEntity[]; // One to many
  coverImage?: string;
  deliveryTime?: number;
  sales?: number;
  averageRating?: number;
  isActive?: boolean;

  constructor(partial: Partial<GigEntity>) {
    super();
    Object.assign(this, partial);
  }
}
