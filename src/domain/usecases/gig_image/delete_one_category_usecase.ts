import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { ISkillsRepository } from '../../repositories/skilles.repository';
import { SkillsEntity } from '../../entities/skills.entity';
import { ICategoryRepository } from 'src/domain/repositories/category.repository';
import { CategoryEntity } from 'src/domain/entities/category.entity';

export class DeleteOneCategoryUseCase implements IBaseUseCase<boolean> {
  constructor(private categoryRepository: ICategoryRepository) {}

  execute(filter: Partial<CategoryEntity>): Promise<boolean> {
    return this.categoryRepository.deleteOne(filter);
  }
}
