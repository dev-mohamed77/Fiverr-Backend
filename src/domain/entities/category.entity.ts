import { UserEntity } from './user.entity';
import { SubCategoryEntity } from './subCategory.entity';
import BaseEntity from '../../application/core/base/base_entity';
import { GigEntity } from './gig.entity';

export class CategoryEntity extends BaseEntity {
  name?: string;
  src?: string;
  user?: UserEntity; // many to one
  subCategories?: SubCategoryEntity[]; // one to many
  gig?: GigEntity[]; // One To Many

  constructor(partial: Partial<CategoryEntity>) {
    super();
    Object.assign(this, partial);
  }
}
