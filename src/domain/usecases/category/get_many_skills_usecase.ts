import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { PaginationModel } from '../../../application/core/model/pagination_model';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { ISkillsRepository } from '../../repositories/skilles.repository';
import { SkillsEntity } from '../../entities/skills.entity';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

export class GetManySkillsUseCase implements IBaseUseCase<SkillsEntity[]> {
  constructor(private skillsRepository: ISkillsRepository) {}

  execute(
    filter: Partial<SkillsEntity>,
    pagination: PaginationModel,
    relation?: FindOptionsRelations<SkillsEntity>,
    select?: FindOptionsSelect<SkillsEntity>,
  ): Promise<SkillsEntity[]> {
    return this.skillsRepository.findMany(filter, pagination, relation, select);
  }
}
