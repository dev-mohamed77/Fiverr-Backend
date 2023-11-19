import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { ISubCategoryRepository } from 'src/domain/repositories/subCategory.repository';
import { SubCategoryEntity } from 'src/domain/entities/subCategory.entity';

export class CreateSubCategoryUseCase
  implements IBaseUseCase<SubCategoryEntity>
{
  constructor(private subCategoryRepository: ISubCategoryRepository) {}

  execute(params: SubCategoryEntity): Promise<SubCategoryEntity> {
    return this.subCategoryRepository.create(params);
  }
}
