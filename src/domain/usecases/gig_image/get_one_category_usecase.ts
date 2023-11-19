import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { ISkillsRepository } from '../../repositories/skilles.repository';
import { SkillsEntity } from '../../entities/skills.entity';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';
import { ICategoryRepository } from 'src/domain/repositories/category.repository';
import { CategoryEntity } from 'src/domain/entities/category.entity';

export class GetOneCategoryUseCase implements IBaseUseCase<CategoryEntity> {
  constructor(private categoryRepository: ICategoryRepository) {}

  execute(
    filter: Partial<CategoryEntity>,
    relation?: FindOptionsRelations<CategoryEntity>,
    select?: FindOptionsSelect<CategoryEntity>,
  ): Promise<CategoryEntity> {
    return this.categoryRepository.findOne(filter, relation, select);
  }
}
