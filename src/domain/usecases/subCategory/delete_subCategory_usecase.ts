import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { ISubCategoryRepository } from 'src/domain/repositories/subCategory.repository';

export class DeleteSubCategoryUseCase implements IBaseUseCase<boolean> {
  constructor(private subCategoryRepository: ISubCategoryRepository) {}

  execute(id: string): Promise<boolean> {
    return this.subCategoryRepository.delete(id);
  }
}
