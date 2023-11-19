import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { ISubCategoryRepository } from 'src/domain/repositories/subCategory.repository';
import { SubCategoryEntity } from 'src/domain/entities/subCategory.entity';

export class DeleteOneSubCategoryUseCase implements IBaseUseCase<boolean> {
  constructor(private subCategoryRepository: ISubCategoryRepository) {}

  execute(filter: Partial<SubCategoryEntity>): Promise<boolean> {
    return this.subCategoryRepository.deleteOne(filter);
  }
}
