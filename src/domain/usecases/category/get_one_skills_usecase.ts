import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { ISkillsRepository } from '../../repositories/skilles.repository';
import { SkillsEntity } from '../../entities/skills.entity';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

export class GetOneSkillsUseCase implements IBaseUseCase<SkillsEntity> {
  constructor(private skillsRepository: ISkillsRepository) {}

  execute(
    filter: Partial<SkillsEntity>,
    relation?: FindOptionsRelations<SkillsEntity>,
    select?: FindOptionsSelect<SkillsEntity>,
  ): Promise<SkillsEntity> {
    return this.skillsRepository.findOne(filter, relation, select);
  }
}
