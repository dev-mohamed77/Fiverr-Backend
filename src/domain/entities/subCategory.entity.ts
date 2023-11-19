import BaseEntity from '../../application/core/base/base_entity';
import { CategoryEntity } from './category.entity';
import { UserEntity } from './user.entity';

export class SubCategoryEntity extends BaseEntity {
  name?: string;
  category?: CategoryEntity; // Many to one
  user?: UserEntity;

  constructor(partial: Partial<SubCategoryEntity>) {
    super();
    Object.assign(this, partial);
  }
}
