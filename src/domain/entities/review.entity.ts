import BaseEntity from '../../application/core/base/base_entity';
import { GigEntity } from './gig.entity';
import { UserEntity } from './user.entity';

export class ReviewEntity extends BaseEntity {
  user: UserEntity;
  gig: GigEntity;
  star: number;
  description: string;

  constructor(partial: Partial<ReviewEntity>) {
    super();
    Object.assign(this, partial);
  }
}
