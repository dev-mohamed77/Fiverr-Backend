import BaseEntity from '../../application/core/base/base_entity';
import { SkillLevel } from '../../application/config/enum/skill_level';
import SellerEntity from './seller.entity';

export class SkillsEntity extends BaseEntity {
  skill: string;
  level: SkillLevel;
  seller: SellerEntity; // many to one

  constructor(partial: Partial<SkillsEntity>) {
    super();
    Object.assign(this, partial);
  }
}
