import BaseEntity from '../../application/core/base/base_entity';
import { UserEntity } from './user.entity';
import { GigEntity } from './gig.entity';

export class FavoriteEntity extends BaseEntity {
  user: UserEntity;
  gig: GigEntity;

  constructor(partial: Partial<FavoriteEntity>) {
    super();
    Object.assign(this, partial);
  }
}
