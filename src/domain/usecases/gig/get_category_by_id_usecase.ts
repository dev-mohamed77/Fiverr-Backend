import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { ISkillsRepository } from '../../repositories/skilles.repository';
import { SkillsEntity } from '../../entities/skills.entity';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';
import { CategoryEntity } from 'src/domain/entities/category.entity';
import { ICategoryRepository } from 'src/domain/repositories/category.repository';

export class GetCategoryByIdUseCase implements IBaseUseCase<CategoryEntity> {
  constructor(private categoryRepository: ICategoryRepository) {}

  execute(
    id: string,
    relation?: FindOptionsRelations<CategoryEntity>,
    select?: FindOptionsSelect<CategoryEntity>,
  ): Promise<CategoryEntity> {
    return this.categoryRepository.findById(id, relation, select);
  }
}
