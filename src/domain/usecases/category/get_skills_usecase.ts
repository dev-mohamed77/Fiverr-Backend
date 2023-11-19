import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { PaginationModel } from '../../../application/core/model/pagination_model';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { ISkillsRepository } from '../../repositories/skilles.repository';
import { SkillsEntity } from '../../entities/skills.entity';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

export class GetSkillsUseCase
  implements IBaseUseCase<[SkillsEntity[], number]>
{
  constructor(private skillsRepository: ISkillsRepository) {}

  execute(
    pagination: PaginationModel,
    relation?: FindOptionsRelations<SkillsEntity>,
    select?: FindOptionsSelect<SkillsEntity>,
  ): Promise<[SkillsEntity[], number]> {
    return this.skillsRepository.findAll(pagination, relation, select);
  }
}
