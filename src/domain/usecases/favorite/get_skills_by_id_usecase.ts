import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { ISkillsRepository } from '../../repositories/skilles.repository';
import { SkillsEntity } from '../../entities/skills.entity';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

export class GetSkillsByIdUseCase implements IBaseUseCase<SkillsEntity> {
  constructor(private skillsRepository: ISkillsRepository) {}

  execute(
    id: string,
    relation?: FindOptionsRelations<SkillsEntity>,
    select?: FindOptionsSelect<SkillsEntity>,
  ): Promise<SkillsEntity> {
    return this.skillsRepository.findById(id, relation, select);
  }
}
