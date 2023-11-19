import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { PaginationModel } from '../../../application/core/model/pagination_model';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { ISkillsRepository } from '../../repositories/skilles.repository';
import { SkillsEntity } from '../../entities/skills.entity';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';
import { ICategoryRepository } from 'src/domain/repositories/category.repository';
import { CategoryEntity } from 'src/domain/entities/category.entity';

export class GetCategoriesUseCase
  implements IBaseUseCase<[CategoryEntity[], number]>
{
  constructor(private categoryRepository: ICategoryRepository) {}

  execute(
    pagination: PaginationModel,
    relation?: FindOptionsRelations<CategoryEntity>,
    select?: FindOptionsSelect<CategoryEntity>,
  ): Promise<[CategoryEntity[], number]> {
    return this.categoryRepository.findAll(pagination, relation, select);
  }
}
