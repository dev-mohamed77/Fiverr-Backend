import { PartialType } from '@nestjs/mapped-types';
import { CreateSkillDto } from './create_skill.dto';

export class UpdateSkillDto extends PartialType(CreateSkillDto) {}
