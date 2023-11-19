import BaseEntity from '../../application/core/base/base_entity';
import { Gender } from '../../application/config/enum/gender';
import { Exclude } from 'class-transformer';
import SellerEntity from './seller.entity';
import { Role } from '../../application/config/enum/roles';
import { CategoryEntity } from './category.entity';
import { SubCategoryEntity } from './subCategory.entity';

export class UserEntity extends BaseEntity {
  name?: string;
  email?: string;

  @Exclude()
  password?: string;

  gender?: Gender;
  phone?: string;
  age?: number;
  country?: string;
  isSeller?: boolean;
  seller?: SellerEntity;
  categories?: CategoryEntity[]; // one to many
  subCategories?: SubCategoryEntity[]; // one to many
  roles?: Role;
  passwordChangedAt?: Date;
  passwordResetCode?: string;
  passwordResetExpires?: Date;
  passwordResetVerified?: boolean;

  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }
}
