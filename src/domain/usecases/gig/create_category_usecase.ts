import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { ISkillsRepository } from '../../repositories/skilles.repository';
import { SkillsEntity } from '../../entities/skills.entity';
import { CategoryEntity } from 'src/domain/entities/category.entity';
import { ICategoryRepository } from 'src/domain/repositories/category.repository';

export class CreateCategoryUseCase implements IBaseUseCase<CategoryEntity> {
  constructor(private CategoryRepository: ICategoryRepository) {}

  execute(params: CategoryEntity): Promise<CategoryEntity> {
    return this.CategoryRepository.create(params);
  }
}
