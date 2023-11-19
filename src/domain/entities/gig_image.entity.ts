import BaseEntity from '../../application/core/base/base_entity';
import { GigEntity } from './gig.entity';

export class GigImageEntity extends BaseEntity {
  src: string;
  gig: GigEntity; // Many to One

  constructor(partial: Partial<GigImageEntity>) {
    super();
    Object.assign(this, partial);
  }
}
