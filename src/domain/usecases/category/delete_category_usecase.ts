import { ICategoryRepository } from 'src/domain/repositories/category.repository';
import { IBaseUseCase } from '../../../application/core/base/base_usecase';

export class DeleteCategoryUseCase implements IBaseUseCase<boolean> {
  constructor(private CategoryRepository: ICategoryRepository) {}

  execute(id: string): Promise<boolean> {
    return this.CategoryRepository.delete(id);
  }
}
