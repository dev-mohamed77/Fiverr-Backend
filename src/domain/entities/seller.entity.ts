import BaseEntity from '../../application/core/base/base_entity';
import { LanguageEntity } from './language.entity';
import { SkillsEntity } from './skills.entity';
import { OccupationEntity } from './occupation.entity';
import { UserEntity } from './user.entity';
import { GigEntity } from './gig.entity';

export default class SellerEntity extends BaseEntity {
  fullName?: string;
  displayName?: string;
  picture?: string;
  description?: string;
  balance?: number;
  user?: UserEntity; // one to one
  gig?: GigEntity[]; // one to many
  language?: LanguageEntity[]; // one to many
  occupation?: OccupationEntity[]; // one to many
  skills?: SkillsEntity[]; // one to many
  website?: string;

  constructor(partial: Partial<SellerEntity>) {
    super();
    Object.assign(this, partial);
  }
}
