import { ICategoryRepository } from 'src/domain/repositories/category.repository';
import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { ISkillsRepository } from '../../repositories/skilles.repository';

export class DeleteCategoryUseCase implements IBaseUseCase<boolean> {
  constructor(private CategoryRepository: ICategoryRepository) {}

  execute(id: string): Promise<boolean> {
    return this.CategoryRepository.delete(id);
  }
}
