import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { ISkillsRepository } from '../../repositories/skilles.repository';
import { SkillsEntity } from '../../entities/skills.entity';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

export class UpdateSkillsUseCase implements IBaseUseCase<SkillsEntity> {
  constructor(private skillsRepository: ISkillsRepository) {}

  execute(
    id: string,
    params: SkillsEntity,
    relation?: FindOptionsRelations<SkillsEntity>,
    select?: FindOptionsSelect<SkillsEntity>,
  ): Promise<SkillsEntity> {
    return this.skillsRepository.update(id, params, relation, select);
  }
}
