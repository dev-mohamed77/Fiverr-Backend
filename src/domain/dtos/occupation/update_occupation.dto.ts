import { PartialType } from '@nestjs/mapped-types';
import { CreateSkillDto } from './create_occupation.dto';

export class UpdateSkillDto extends PartialType(CreateSkillDto) {}
