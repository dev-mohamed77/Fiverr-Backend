import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';
import { ICategoryRepository } from 'src/domain/repositories/category.repository';
import { CategoryEntity } from 'src/domain/entities/category.entity';

export class UpdateCategoryUseCase implements IBaseUseCase<CategoryEntity> {
  constructor(private categoryRepository: ICategoryRepository) {}

  execute(
    id: string,
    params: Partial<CategoryEntity>,
    relation?: FindOptionsRelations<CategoryEntity>,
    select?: FindOptionsSelect<CategoryEntity>,
  ): Promise<CategoryEntity> {
    return this.categoryRepository.update(id, params, relation, select);
  }
}
