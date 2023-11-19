import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { ICategoryRepository } from 'src/domain/repositories/category.repository';
import { CategoryEntity } from 'src/domain/entities/category.entity';

export class DeleteOneCategoryUseCase implements IBaseUseCase<boolean> {
  constructor(private categoryRepository: ICategoryRepository) {}

  execute(filter: Partial<CategoryEntity>): Promise<boolean> {
    return this.categoryRepository.deleteOne(filter);
  }
}
