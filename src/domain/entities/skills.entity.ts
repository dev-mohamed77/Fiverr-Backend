import BaseEntity from '../../application/core/base/base_entity';
import { SkillLevel } from '../../application/config/enum/skill_level';

export class SkillsEntity extends BaseEntity {
  skill: string;
  level: SkillLevel;
}
