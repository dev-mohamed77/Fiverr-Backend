import IBaseRepository from '../../application/core/base/base_repository';
import { SkillsEntity } from '../entities/skills.entity';

export abstract class ISkillsRepository extends IBaseRepository<SkillsEntity> {}
